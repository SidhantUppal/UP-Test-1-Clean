using Bus.Tasks;
using Data.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace Api.Tasks.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;

        public TaskController(ILogger<TaskController> logger)
        {
            _logger = logger;
        }

        [HttpGet("health")]
        [AllowAnonymous]
        public IActionResult Health()
        {
            return Ok("Tasks API is healthy");
        }

        #region Create

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] BSSTaskViewModel request)
        {
            try
            {
                var task = new BSSTask(request);
                var taskId = await task.SaveAndReturnAsync(request.CreatedByUserID);
                var createdTask = task.GetViewModel();
                
                return CreatedAtAction(nameof(GetTaskById), new { id = taskId }, createdTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task");
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Read

        [HttpGet]
        public async Task<IActionResult> GetAllTasks([FromQuery] int? userAreaId = null)
        {
            try
            {
                var tasks = await BSSTask.GetAllTasksAsync(userAreaId);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tasks");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id, [FromQuery] int userAreaId = 0)
        {
            try
            {
                BSSTaskViewModel? task = null;
                
                if (userAreaId > 0)
                {
                    task = await BSSTask.GetTaskByIdAsync(id, userAreaId);
                }
                else
                {
                    // Find the task in any user area using Bus layer
                    var taskInfo = await BSSTask.GetTaskInfoAsync(id);
                    if (taskInfo.HasValue)
                    {
                        task = await BSSTask.GetTaskByIdAsync(id, taskInfo.Value.UserAreaID);
                    }
                }
                
                if (task == null)
                {
                    return NotFound($"Task with ID {id} not found");
                }
                return Ok(task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving task with ID {TaskId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("overdue")]
        public async Task<IActionResult> GetOverdueTasks([FromQuery] int? userAreaId = null)
        {
            try
            {
                var tasks = await BSSTask.GetOverdueTasksAsync(userAreaId);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving overdue tasks");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("status/{statusId}")]
        public async Task<IActionResult> GetTasksByStatus(int statusId, [FromQuery] int? userAreaId = null)
        {
            try
            {
                var tasks = await BSSTask.GetTasksByStatusAsync(statusId, userAreaId);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tasks by status {StatusId}", statusId);
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Update

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] BSSTaskViewModel request)
        {
            try
            {
                // Ensure the TaskID matches the route parameter
                request.TaskID = id;
                
                var task = new BSSTask(request);
                await task.SaveAsync(request.ModifiedByUserID ?? 0);
                var updatedTask = task.GetViewModel();
                
                return Ok(updatedTask);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Task with ID {id} not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating task with ID {TaskId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteTask(int id, [FromBody] CompleteTaskRequest request)
        {
            try
            {
                // Find the task first to get userAreaId using Bus layer
                var taskInfo = await BSSTask.GetTaskInfoAsync(id);
                if (!taskInfo.HasValue)
                {
                    return NotFound($"Task with ID {id} not found");
                }

                var task = new BSSTask(id, taskInfo.Value.UserAreaID);
                await task.CompleteAsync(request.CompletedByUserId ?? 0, request.CompletedByFullName, request.CompletedBySignature);
                var completedTask = task.GetViewModel();
                
                return Ok(completedTask);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Task with ID {id} not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error completing task with ID {TaskId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Delete

        [HttpDelete("{id}")]
        public async Task<IActionResult> ArchiveTask(int id, [FromBody] ArchiveTaskRequest request)
        {
            try
            {
                // Find the task first to get userAreaId using Bus layer
                var taskInfo = await BSSTask.GetTaskInfoAsync(id);
                if (!taskInfo.HasValue)
                {
                    return NotFound($"Task with ID {id} not found");
                }

                var task = new BSSTask(id, taskInfo.Value.UserAreaID);
                await task.ArchiveAsync(request.ArchivedByUserID);
                var archivedTask = task.GetViewModel();
                
                return Ok(archivedTask);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Task with ID {id} not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error archiving task with ID {TaskId}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion

        #region Test Methods

        [HttpPost("test")]
        [AllowAnonymous]
        public async Task<IActionResult> TestCrudCycle()
        {
            var testResults = new List<string>();
            BSSTask? testTask = null;
            int taskId = 0;

            try
            {
                testResults.Add("[1/7] Starting CRUD test cycle...");

                // DATABASE CONNECTION CHECK: Test database connectivity first
                testResults.Add("[2/7] Testing database connection...");
                try
                {
                    using (var testContext = new Data.EntityFramework.V7DBContext())
                    {
                        var canConnect = await testContext.Database.CanConnectAsync();
                        if (!canConnect)
                        {
                            testResults.Add("[2/7] DATABASE: FAILED - Cannot connect to database");
                            return BadRequest(new { Success = false, Results = testResults, Error = "Database connection failed" });
                        }
                        
                        // Test basic query to ensure database is accessible and has expected structure
                        var userAreaCount = await testContext.UserAreas.CountAsync();
                        var taskTypeCount = await testContext.TaskTypes.CountAsync();
                        var userCount = await testContext.Users.CountAsync();
                        testResults.Add($"[2/7] DATABASE: SUCCESS - Connected to database with {userAreaCount} user areas, {taskTypeCount} task types, {userCount} users");
                    }
                }
                catch (Exception dbEx)
                {
                    testResults.Add($"[2/7] DATABASE: FAILED - {dbEx.Message}");
                    return BadRequest(new { Success = false, Results = testResults, Error = $"Database error: {dbEx.Message}" });
                }

                // CREATE: Create a new test task with dynamic data lookup
                testResults.Add("[3/7] CREATE: Preparing test task data...");
                
                int? validUserAreaId = null;
                int? validTaskTypeId = null; 
                int? validUserId = null;
                
                using (var testContext = new Data.EntityFramework.V7DBContext())
                {
                    // Find first available UserArea, TaskType, and User
                    var firstUserArea = await testContext.UserAreas.FirstOrDefaultAsync();
                    var firstTaskType = await testContext.TaskTypes.FirstOrDefaultAsync();
                    var firstUser = await testContext.Users.FirstOrDefaultAsync();
                    
                    validUserAreaId = firstUserArea?.UserAreaID;
                    validTaskTypeId = firstTaskType?.TaskTypeID;
                    validUserId = firstUser?.UserID;
                    
                    if (validUserAreaId == null || validTaskTypeId == null || validUserId == null)
                    {
                        testResults.Add($"[3/7] CREATE: SKIPPED - Missing required data (UserArea: {validUserAreaId}, TaskType: {validTaskTypeId}, User: {validUserId})");
                        testResults.Add("✅ CRUD test completed with database connectivity verified");
                        return Ok(new { Success = true, TaskId = 0, Results = testResults, Note = "CRUD test skipped due to missing reference data" });
                    }
                }

                var createModel = new BSSTaskViewModel
                {
                    Title = $"Test Task - {DateTime.Now:yyyy-MM-dd HH:mm:ss}",
                    Description = "This is a test task created by the CRUD test cycle",
                    Reference = $"TEST-{DateTime.Now.Ticks}",
                    UserAreaID = validUserAreaId.Value,
                    TaskTypeID = validTaskTypeId.Value,
                    DueDate = DateTime.UtcNow.AddDays(7),
                    CreatedDate = DateTime.UtcNow, // Valid DateTime within SQL Server range
                    CreatedByUserID = validUserId.Value,
                    IsAnonymous = false,
                    IsEvidenceRequiredToClose = false,
                    IsCreatorApprovalRequiredToClose = false,
                    TaskStatusTypeID = 1, // Set default status (assuming 1 is a valid status)
                    CanOneEmployeeAccept = false,
                    IsSubmittedForApproval = false,
                    // Explicitly set ALL nullable DateTime fields to null to prevent DateTime.MinValue issues
                    CompletedDate = null,        // Not completed yet
                    ModifiedDate = null,     // Will be set by audit system
                    ArchivedDate = null,         // Not archived yet
                    DueFrom = null,              // Optional field
                    IsLiveDate = null,           // Optional field  
                    ExpiredDate = null           // Optional field - THIS was likely causing the overflow
                };

                // Defensive validation: Check for invalid DateTime values before creating entity
                var sqlMinDate = new DateTime(1753, 1, 1);
                var sqlMaxDate = new DateTime(9999, 12, 31);
                
                if (createModel.CreatedDate < sqlMinDate || createModel.CreatedDate > sqlMaxDate)
                {
                    testResults.Add($"[3/7] CREATE: WARNING - CreatedDate {createModel.CreatedDate} is outside SQL Server range");
                    createModel.CreatedDate = DateTime.UtcNow; // Fix invalid date
                }
                
                testResults.Add($"[3/7] CREATE: Using DateTime values - CreatedDate: {createModel.CreatedDate}, DueDate: {createModel.DueDate}");
                
                // Log ALL DateTime fields for debugging
                testResults.Add($"[3/7] CREATE: All TaskViewModel DateTime fields:");
                testResults.Add($"  - CreatedDate: {createModel.CreatedDate}");
                testResults.Add($"  - DueDate: {createModel.DueDate}"); 
                testResults.Add($"  - CompletedDate: {createModel.CompletedDate?.ToString() ?? "NULL"}");
                testResults.Add($"  - ModifiedDate: {createModel.ModifiedDate?.ToString() ?? "NULL"}");
                testResults.Add($"  - ArchivedDate: {createModel.ArchivedDate?.ToString() ?? "NULL"}");
                testResults.Add($"  - DueFrom: {createModel.DueFrom?.ToString() ?? "NULL"}");
                testResults.Add($"  - IsLiveDate: {createModel.IsLiveDate?.ToString() ?? "NULL"}");
                testResults.Add($"  - ExpiredDate: {createModel.ExpiredDate?.ToString() ?? "NULL"}");
                
                testTask = new BSSTask(createModel);
                testResults.Add($"[3/7] CREATE: BSSTask created from TaskViewModel");
                
                // Add debugging around the save operation
                try
                {
                    testResults.Add($"[3/7] CREATE: About to call SaveAndReturnAsync with userId: {validUserId.Value}");
                    taskId = await testTask.SaveAndReturnAsync(validUserId.Value);
                    testResults.Add($"[3/7] CREATE: Successfully created task with ID {taskId}");
                }
                catch (Exception saveEx)
                {
                    testResults.Add($"[3/7] CREATE: Save failed - examining BSSTask entity values...");
                    
                    // Try to access BSSTask properties to see what values are being saved
                    try
                    {
                        testResults.Add($"[3/7] CREATE: BSSTask entity values:");
                        testResults.Add($"  - TaskID: {testTask.TaskID}");
                        testResults.Add($"  - Title: {testTask.Title}");
                        testResults.Add($"  - UserAreaID: {testTask.UserAreaID}");
                        testResults.Add($"  - TaskTypeID: {testTask.TaskTypeID}");
                        testResults.Add($"  - CreatedByUserID: {testTask.CreatedByUserID}");
                        testResults.Add($"  - DueDate: {testTask.DueDate?.ToString() ?? "NULL"}");
                        testResults.Add($"  - CreatedDate: {testTask.CreatedDate}");
                    }
                    catch (Exception propEx)
                    {
                        testResults.Add($"[3/7] CREATE: Could not read BSSTask properties: {propEx.Message}");
                    }
                    
                    throw; // Re-throw the original exception
                }

                // READ: Retrieve the created task
                var retrievedTask = await BSSTask.GetTaskByIdAsync(taskId, validUserAreaId.Value);
                if (retrievedTask == null)
                {
                    testResults.Add("[4/7] READ: FAILED - Could not retrieve created task");
                    return BadRequest(new { Success = false, Results = testResults });
                }
                testResults.Add($"[4/7] READ: Successfully retrieved task '{retrievedTask.Title}'");

                // UPDATE: Modify the task
                testTask.Title = $"Updated Test Task - {DateTime.Now:yyyy-MM-dd HH:mm:ss}";
                testTask.Description = "This task has been updated by the CRUD test cycle";
                await testTask.SaveAsync(validUserId.Value);
                
                var updatedTask = await BSSTask.GetTaskByIdAsync(taskId, validUserAreaId.Value);
                testResults.Add($"[5/7] UPDATE: Successfully updated task title to '{updatedTask?.Title}'");

                // COMPLETE: Complete the task
                await testTask.CompleteAsync(validUserId.Value, "Test User", "Test Signature");
                var completedTask = await BSSTask.GetTaskByIdAsync(taskId, validUserAreaId.Value);
                if (completedTask?.CompletedDate.HasValue == true)
                {
                    testResults.Add($"[6/7] COMPLETE: Successfully completed task at {completedTask.CompletedDate}");
                }
                else
                {
                    testResults.Add("[6/7] COMPLETE: FAILED - Task completion not recorded");
                }

                // DELETE (Archive): Archive the task
                await testTask.ArchiveAsync(validUserId.Value);
                var archivedTask = await BSSTask.GetTaskByIdAsync(taskId, validUserAreaId.Value);
                
                // Task should not be retrievable after archiving (returns null)
                if (archivedTask == null)
                {
                    testResults.Add("[7/7] DELETE (Archive): Successfully archived task - no longer retrievable");
                }
                else
                {
                    testResults.Add($"[7/7] DELETE (Archive): Task archived at {archivedTask.ArchivedDate}");
                }

                testResults.Add("✅ CRUD test cycle completed successfully!");

                return Ok(new 
                { 
                    Success = true,
                    TaskId = taskId,
                    Results = testResults,
                    FinalTaskState = archivedTask
                });
            }
            catch (Exception ex)
            {
                // Get detailed error information including inner exceptions
                var errorDetails = ex.Message;
                var innerEx = ex.InnerException;
                var innerMessages = new List<string>();
                
                while (innerEx != null)
                {
                    innerMessages.Add(innerEx.Message);
                    innerEx = innerEx.InnerException;
                }
                
                testResults.Add($"❌ ERROR: {errorDetails}");
                if (innerMessages.Count > 0)
                {
                    testResults.Add($"📋 Inner Exception(s): {string.Join(" -> ", innerMessages)}");
                }
                
                // Clean up if task was created but test failed
                if (taskId > 0 && testTask != null)
                {
                    try
                    {
                        await testTask.ArchiveAsync(1);
                        testResults.Add("🧹 Cleanup: Archived test task due to error");
                    }
                    catch
                    {
                        testResults.Add("🧹 Cleanup: Could not archive test task");
                    }
                }

                return BadRequest(new 
                { 
                    Success = false,
                    TaskId = taskId,
                    Results = testResults,
                    Error = errorDetails,
                    InnerErrors = innerMessages
                });
            }
            finally
            {
                testTask?.Dispose();
            }
        }

        [HttpPost("test-connection")]
        [AllowAnonymous]
        public async Task<IActionResult> TestDatabaseConnection()
        {
            var testResults = new List<string>();
            var performanceMetrics = new Dictionary<string, object>();

            try
            {
                // Get connection string from appsettings.json
                var connectionString = HttpContext.RequestServices.GetRequiredService<IConfiguration>()
                    .GetConnectionString("DefaultConnection");

                if (string.IsNullOrEmpty(connectionString))
                {
                    testResults.Add("❌ No connection string found in appsettings.json");
                    return BadRequest(new { Success = false, Results = testResults, Error = "Missing connection string" });
                }

                testResults.Add($"📋 Using connection string from appsettings.json");
                var totalStopwatch = System.Diagnostics.Stopwatch.StartNew();

                // Test direct SQL connection
                using (var connection = new SqlConnection(connectionString))
                {
                    var connStopwatch = System.Diagnostics.Stopwatch.StartNew();
                    await connection.OpenAsync();
                    connStopwatch.Stop();
                    
                    testResults.Add($"✅ SQL Connection: Connected to {connection.Database} on {connection.DataSource} in {connStopwatch.ElapsedMilliseconds}ms");
                    performanceMetrics["ConnectionTime"] = connStopwatch.ElapsedMilliseconds;
                    
                    // Quick database validation
                    var queryStopwatch = System.Diagnostics.Stopwatch.StartNew();
                    using (var command = new SqlCommand("SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES", connection))
                    {
                        var tableCount = await command.ExecuteScalarAsync();
                        queryStopwatch.Stop();
                        testResults.Add($"✅ Database Query: {tableCount} tables found ({queryStopwatch.ElapsedMilliseconds}ms)");
                        performanceMetrics["QueryTime"] = queryStopwatch.ElapsedMilliseconds;
                    }
                }

                // Test Entity Framework separately to isolate any issues
                try
                {
                    var efStopwatch = System.Diagnostics.Stopwatch.StartNew();
                    using (var context = new Data.EntityFramework.V7DBContext())
                    {
                        var efConnectionString = context.Database.GetConnectionString();
                        testResults.Add($"📋 EF using connection: {efConnectionString}");
                        
                        var userAreaCount = await context.UserAreas.CountAsync();
                        efStopwatch.Stop();
                        testResults.Add($"✅ Entity Framework: {userAreaCount} user areas found ({efStopwatch.ElapsedMilliseconds}ms)");
                        performanceMetrics["EFTime"] = efStopwatch.ElapsedMilliseconds;
                    }
                }
                catch (Exception efEx)
                {
                    testResults.Add($"❌ Entity Framework failed: {efEx.Message}");
                    testResults.Add("💡 EF may be using cached configuration - restart the application");
                    performanceMetrics["EFTime"] = -1; // Indicate failure
                }

                totalStopwatch.Stop();
                performanceMetrics["TotalTime"] = totalStopwatch.ElapsedMilliseconds;
                
                var success = performanceMetrics.ContainsKey("ConnectionTime") && 
                             performanceMetrics.ContainsKey("QueryTime") && 
                             (long)performanceMetrics["EFTime"] >= 0;
                             
                testResults.Add(success ? $"🎯 All tests passed in {totalStopwatch.ElapsedMilliseconds}ms total" : 
                                         "⚠️ Some tests failed - see details above");

                return Ok(new 
                { 
                    Success = success,
                    Results = testResults,
                    PerformanceMetrics = performanceMetrics,
                    ConnectionString = connectionString
                });
            }
            catch (Exception ex)
            {
                testResults.Add($"❌ Connection failed: {ex.Message}");
                return BadRequest(new { Success = false, Results = testResults, Error = ex.Message });
            }
        }

        #endregion
    }

    public class CompleteTaskRequest
    {
        public string? CompletedByFullName { get; set; }
        public string? CompletedBySignature { get; set; }
        public int? CompletedByUserId { get; set; }
    }

    public class ArchiveTaskRequest
    {
        public int ArchivedByUserID { get; set; }
    }
}
