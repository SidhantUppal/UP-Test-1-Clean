# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["Api.SysAdmin/Api.SysAdmin.csproj", "Api.SysAdmin/"]
COPY ["Bus.Authentication/Bus.Authentication.csproj", "Bus.Authentication/"]
COPY ["Data.Core/Bus.Core.csproj", "Data.Core/"]
COPY ["Data.EntityFramework/Data.EntityFramework.csproj", "Data.EntityFramework/"]
COPY ["Data.ViewModels/Data.ViewModels.csproj", "Data.ViewModels/"]

RUN dotnet restore "Api.SysAdmin/Api.SysAdmin.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/Api.SysAdmin"
RUN dotnet build "Api.SysAdmin.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "Api.SysAdmin.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Create non-root user
RUN groupadd -r aspnetapp && useradd -r -g aspnetapp aspnetapp

# Copy published application
COPY --from=publish /app/publish .

# Switch to non-root user
USER aspnetapp

# Expose ports
EXPOSE 3011
EXPOSE 3012

# Set environment variables
ENV ASPNETCORE_URLS="http://+:3011;https://+:3012"
ENV ASPNETCORE_ENVIRONMENT="Production"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3011/health || exit 1

# Start the application
ENTRYPOINT ["dotnet", "Api.SysAdmin.dll"]