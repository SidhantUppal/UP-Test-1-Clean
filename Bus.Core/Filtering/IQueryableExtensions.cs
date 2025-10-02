using System.Linq.Expressions;
using System.Reflection;

namespace Bus.Core.Filtering
{
    /// <summary>
    /// Extension methods for IQueryable to provide reusable filtering capabilities
    /// </summary>
    public static class IQueryableExtensions
    {
        /// <summary>
        /// Apply filters from a filter object to an IQueryable using reflection and property mapping
        /// </summary>
        /// <typeparam name="T">The entity type being filtered</typeparam>
        /// <typeparam name="TFilter">The filter object type</typeparam>
        /// <param name="query">The queryable to filter</param>
        /// <param name="filter">The filter object containing filter values</param>
        /// <param name="dateFieldName">Optional: Specify which date field to use for date range filtering (defaults to "CreatedDate")</param>
        /// <returns>Filtered IQueryable</returns>
        public static IQueryable<T> ApplyFilters<T, TFilter>(this IQueryable<T> query, TFilter filter, string? dateFieldName = null)
            where TFilter : class
        {
            if (filter == null) return query;

            var filterType = typeof(TFilter);
            var entityType = typeof(T);
            var targetDateField = dateFieldName ?? "CreatedDate";

            foreach (var filterProperty in filterType.GetProperties())
            {
                var filterValue = filterProperty.GetValue(filter);

                // Skip null, empty, or default values
                if (IsNullOrDefault(filterValue)) continue;

                // Handle special filter properties
                if (HandleSpecialFilters(ref query, filterProperty, filterValue, targetDateField))
                    continue;

                // Find corresponding property in entity
                var entityProperty = FindEntityProperty(entityType, filterProperty.Name);
                if (entityProperty == null) continue;

                // Apply filter based on property type
                query = ApplyPropertyFilter(query, entityProperty, filterValue);
            }

            return query;
        }

        /// <summary>
        /// Apply base property filters that are common across most entities
        /// </summary>
        public static IQueryable<T> ApplyBaseFilters<T>(this IQueryable<T> query, BaseFilterViewModel filter, string? dateFieldName = null)
        {
            if (filter == null) return query;

            var entityType = typeof(T);
            var targetDateField = dateFieldName ?? "CreatedDate";

            // Apply UserAreaID filter if present
            if (filter.UserAreaID.HasValue)
            {
                var userAreaProperty = entityType.GetProperty("UserAreaID", BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (userAreaProperty != null)
                {
                    query = ApplyPropertyFilter(query, userAreaProperty, filter.UserAreaID.Value);
                }
            }

            // Apply StringSearch across Title, Reference, Description
            if (!string.IsNullOrEmpty(filter.StringSearch))
            {
                query = ApplyStringSearchFilter(query, filter.StringSearch);
            }
            // Apply individual field filters if StringSearch is not used
            else
            {
                if (!string.IsNullOrEmpty(filter.Title))
                {
                    var titleProperty = entityType.GetProperty("Title", BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (titleProperty != null)
                    {
                        query = ApplyPropertyFilter(query, titleProperty, filter.Title);
                    }
                }

                if (!string.IsNullOrEmpty(filter.Reference))
                {
                    var refProperty = entityType.GetProperty("Reference", BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (refProperty != null)
                    {
                        query = ApplyPropertyFilter(query, refProperty, filter.Reference);
                    }
                }

                if (!string.IsNullOrEmpty(filter.Description))
                {
                    var descProperty = entityType.GetProperty("Description", BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (descProperty != null)
                    {
                        query = ApplyPropertyFilter(query, descProperty, filter.Description);
                    }
                }
            }

            // Apply date range filters
            if (filter.FromDate.HasValue || filter.ToDate.HasValue)
            {
                query = ApplyDateRangeFilter(query, targetDateField, filter.FromDate, filter.ToDate);
            }

            return query;
        }

        /// <summary>
        /// Apply all filters including base filters, sorting and pagination
        /// </summary>
        public static IQueryable<T> ApplyAllFilters<T, TFilter>(this IQueryable<T> query, TFilter filter, string? dateFieldName = null)
            where TFilter : BaseFilterViewModel
        {
            // Apply base filters
            query = ApplyBaseFilters(query, filter, dateFieldName);

            // Apply entity-specific filters
            query = ApplyFilters(query, filter, dateFieldName);

            // Apply sorting
            query = ApplySorting(query, filter.SortBy ?? filter.GetDefaultSortBy(), filter.SortDirection);

            // Apply pagination
            query = ApplyPagination(query, filter.Page, filter.PageSize);

            return query;
        }

        /// <summary>
        /// Apply sorting to an IQueryable
        /// </summary>
        public static IQueryable<T> ApplySorting<T>(this IQueryable<T> query, string? sortBy, string? sortDirection = "asc")
        {
            if (string.IsNullOrEmpty(sortBy))
                return query;

            var entityType = typeof(T);
            var property = entityType.GetProperty(sortBy, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

            if (property == null)
                return query;

            var parameter = Expression.Parameter(entityType, "x");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);

            var isDescending = sortDirection?.ToLower() == "desc";
            var methodName = isDescending ? "OrderByDescending" : "OrderBy";

            var resultExpression = Expression.Call(
                typeof(Queryable),
                methodName,
                new Type[] { entityType, property.PropertyType },
                query.Expression,
                Expression.Quote(orderByExpression));

            return query.Provider.CreateQuery<T>(resultExpression);
        }

        /// <summary>
        /// Apply pagination to an IQueryable
        /// </summary>
        public static IQueryable<T> ApplyPagination<T>(this IQueryable<T> query, int page, int pageSize)
        {
            var skip = (page - 1) * pageSize;
            return query.Skip(skip).Take(pageSize);
        }

        private static bool IsNullOrDefault(object? value)
        {
            if (value == null) return true;

            var type = value.GetType();

            // Handle nullable types
            if (Nullable.GetUnderlyingType(type) != null)
                return value.Equals(null);

            // Handle strings
            if (type == typeof(string))
                return string.IsNullOrEmpty((string)value);

            // Handle value types
            if (type.IsValueType)
                return value.Equals(Activator.CreateInstance(type));

            return false;
        }

        private static bool HandleSpecialFilters<T>(ref IQueryable<T> query, PropertyInfo filterProperty, object filterValue, string dateFieldName)
        {
            var propertyName = filterProperty.Name.ToLower();

            switch (propertyName)
            {
                case "fromdate":
                    if (filterValue is DateTime fromDate)
                    {
                        query = ApplyDateRangeFilter(query, dateFieldName, fromDate, null);
                        return true;
                    }
                    break;

                case "todate":
                    if (filterValue is DateTime toDate)
                    {
                        // Include the entire day
                        var endOfDay = toDate.Date.AddDays(1).AddTicks(-1);
                        query = ApplyDateRangeFilter(query, dateFieldName, null, endOfDay);
                        return true;
                    }
                    break;

                case "stringsearch":
                    if (filterValue is string searchTerm && !string.IsNullOrEmpty(searchTerm))
                    {
                        query = ApplyStringSearchFilter(query, searchTerm);
                        return true;
                    }
                    break;

                case "userareaid":
                    // Handle UserAreaID specially if needed
                    var entityType = typeof(T);
                    var userAreaProperty = entityType.GetProperty("UserAreaID", BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (userAreaProperty != null)
                    {
                        query = ApplyPropertyFilter(query, userAreaProperty, filterValue);
                        return true;
                    }
                    break;

                case "page":
                case "pagesize":
                case "sortby":
                case "sortdirection":
                case "customfilters":
                case "title":
                case "reference":
                case "description":
                    // These are handled separately or as regular filters
                    return false;
            }

            return false;
        }

        private static PropertyInfo? FindEntityProperty(Type entityType, string filterPropertyName)
        {
            // Try exact match first
            var property = entityType.GetProperty(filterPropertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (property != null) return property;

            // Try common mappings
            var mappings = new Dictionary<string, string[]>
            {
                { "userid", new[] { "CreatedByUserID", "ModifiedByUserID", "UserID" } },
                { "archived", new[] { "ArchivedDate", "IsArchived", "Archived" } }
            };

            var lowerName = filterPropertyName.ToLower();
            if (mappings.ContainsKey(lowerName))
            {
                foreach (var mapping in mappings[lowerName])
                {
                    property = entityType.GetProperty(mapping, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    if (property != null) return property;
                }
            }

            return null;
        }

        private static IQueryable<T> ApplyPropertyFilter<T>(IQueryable<T> query, PropertyInfo entityProperty, object filterValue)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var propertyAccess = Expression.MakeMemberAccess(parameter, entityProperty);

            Expression condition;

            if (entityProperty.PropertyType == typeof(string) ||
                (Nullable.GetUnderlyingType(entityProperty.PropertyType) == typeof(string)))
            {
                // String contains filter
                var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);

                var filterValueExpression = Expression.Constant(filterValue.ToString()?.ToLower());

                // Null check for nullable strings
                var nullCheck = Expression.NotEqual(propertyAccess, Expression.Constant(null, entityProperty.PropertyType));
                var propertyToLower = Expression.Call(propertyAccess, toLowerMethod);
                var containsCall = Expression.Call(propertyToLower, containsMethod, filterValueExpression);

                condition = Expression.AndAlso(nullCheck, containsCall);
            }
            else
            {
                // Exact match filter
                var convertedValue = Convert.ChangeType(filterValue, Nullable.GetUnderlyingType(entityProperty.PropertyType) ?? entityProperty.PropertyType);
                var filterValueExpression = Expression.Constant(convertedValue, entityProperty.PropertyType);
                condition = Expression.Equal(propertyAccess, filterValueExpression);
            }

            var lambda = Expression.Lambda<Func<T, bool>>(condition, parameter);
            return query.Where(lambda);
        }

        private static IQueryable<T> ApplyDateRangeFilter<T>(IQueryable<T> query, string datePropertyName, DateTime? fromDate, DateTime? toDate)
        {
            var entityType = typeof(T);
            var dateProperty = entityType.GetProperty(datePropertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

            if (dateProperty == null) return query;

            var parameter = Expression.Parameter(entityType, "x");
            var propertyAccess = Expression.MakeMemberAccess(parameter, dateProperty);

            // Handle nullable date properties
            var isNullable = Nullable.GetUnderlyingType(dateProperty.PropertyType) != null;
            Expression dateExpression = propertyAccess;

            if (isNullable)
            {
                // Add null check
                var hasValueProperty = dateProperty.PropertyType.GetProperty("HasValue");
                var valueProperty = dateProperty.PropertyType.GetProperty("Value");

                var hasValue = Expression.MakeMemberAccess(propertyAccess, hasValueProperty);
                dateExpression = Expression.MakeMemberAccess(propertyAccess, valueProperty);

                if (fromDate.HasValue)
                {
                    var fromDateValue = ConvertToPropertyType(fromDate.Value, dateProperty.PropertyType);
                    var fromDateExpression = Expression.Constant(fromDateValue, Nullable.GetUnderlyingType(dateProperty.PropertyType) ?? dateProperty.PropertyType);
                    var fromCondition = Expression.GreaterThanOrEqual(dateExpression, fromDateExpression);
                    var fullFromCondition = Expression.AndAlso(hasValue, fromCondition);
                    var fromLambda = Expression.Lambda<Func<T, bool>>(fullFromCondition, parameter);
                    query = query.Where(fromLambda);
                }

                if (toDate.HasValue)
                {
                    var toDateValue = ConvertToPropertyType(toDate.Value.Date.AddDays(1).AddTicks(-1), dateProperty.PropertyType);
                    var toDateExpression = Expression.Constant(toDateValue, Nullable.GetUnderlyingType(dateProperty.PropertyType) ?? dateProperty.PropertyType);
                    var toCondition = Expression.LessThanOrEqual(dateExpression, toDateExpression);
                    var fullToCondition = Expression.AndAlso(hasValue, toCondition);
                    var toLambda = Expression.Lambda<Func<T, bool>>(fullToCondition, parameter);
                    query = query.Where(toLambda);
                }
            }
            else
            {
                if (fromDate.HasValue)
                {
                    var fromDateValue = ConvertToPropertyType(fromDate.Value, dateProperty.PropertyType);
                    var fromDateExpression = Expression.Constant(fromDateValue, dateProperty.PropertyType);
                    var fromCondition = Expression.GreaterThanOrEqual(propertyAccess, fromDateExpression);
                    var fromLambda = Expression.Lambda<Func<T, bool>>(fromCondition, parameter);
                    query = query.Where(fromLambda);
                }

                if (toDate.HasValue)
                {
                    var toDateValue = ConvertToPropertyType(toDate.Value.Date.AddDays(1).AddTicks(-1), dateProperty.PropertyType);
                    var toDateExpression = Expression.Constant(toDateValue, dateProperty.PropertyType);
                    var toCondition = Expression.LessThanOrEqual(propertyAccess, toDateExpression);
                    var toLambda = Expression.Lambda<Func<T, bool>>(toCondition, parameter);
                    query = query.Where(toLambda);
                }
            }

            return query;
        }

        private static object ConvertToPropertyType(DateTime dateTime, Type targetType)
        {
            var underlyingType = Nullable.GetUnderlyingType(targetType) ?? targetType;

            if (underlyingType == typeof(DateTime))
            {
                return dateTime;
            }
            else if (underlyingType == typeof(DateTimeOffset))
            {
                return new DateTimeOffset(dateTime);
            }
            else if (underlyingType == typeof(DateOnly))
            {
                return DateOnly.FromDateTime(dateTime);
            }
            else
            {
                return dateTime;
            }
        }

        private static IQueryable<T> ApplyStringSearchFilter<T>(IQueryable<T> query, string searchTerm)
        {
            var entityType = typeof(T);
            var searchProperties = new[] { "Title", "Reference", "Description" };

            var parameter = Expression.Parameter(entityType, "x");
            Expression? searchCondition = null;

            var searchLower = searchTerm.ToLower();
            var searchConstant = Expression.Constant(searchLower);

            foreach (var propName in searchProperties)
            {
                var property = entityType.GetProperty(propName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (property?.PropertyType != typeof(string)) continue;

                var propertyAccess = Expression.MakeMemberAccess(parameter, property);
                var nullCheck = Expression.NotEqual(propertyAccess, Expression.Constant(null));

                var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);
                var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });

                var propertyToLower = Expression.Call(propertyAccess, toLowerMethod);
                var containsCall = Expression.Call(propertyToLower, containsMethod, searchConstant);

                var propertyCondition = Expression.AndAlso(nullCheck, containsCall);

                searchCondition = searchCondition == null
                    ? propertyCondition
                    : Expression.OrElse(searchCondition, propertyCondition);
            }

            if (searchCondition != null)
            {
                var lambda = Expression.Lambda<Func<T, bool>>(searchCondition, parameter);
                query = query.Where(lambda);
            }

            return query;
        }
    }
}