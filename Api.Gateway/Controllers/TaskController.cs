using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Gateway.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TaskController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<TaskController> _logger;
    private readonly string _taskApiBaseUrl = "http://localhost:4105"; // Api.Tasks port

    public TaskController(HttpClient httpClient, ILogger<TaskController> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    [HttpGet("health")]
    [AllowAnonymous]
    public async Task<IActionResult> Health()
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_taskApiBaseUrl}/api/Task/health");
            var content = await response.Content.ReadAsStringAsync();
            
            if (response.IsSuccessStatusCode)
            {
                return Ok(content);
            }
            
            return StatusCode((int)response.StatusCode, content);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error proxying health check to Task API");
            return StatusCode(500, "Gateway: Task API unavailable");
        }
    }

    // Proxy all other Task API calls
    [HttpGet]
    [HttpGet("{id}")]
    [HttpGet("overdue")]
    [HttpGet("status/{statusId}")]
    [HttpPost]
    [HttpPost("{id}/complete")]
    [HttpPut("{id}")]
    [HttpDelete("{id}")]
    [HttpPost("test")]
    [HttpPost("test-connection")]
    public async Task<IActionResult> ProxyToTaskApi()
    {
        try
        {
            // Get the current request path and query string
            var path = HttpContext.Request.Path.Value;
            var queryString = HttpContext.Request.QueryString.Value;
            var fullPath = $"{_taskApiBaseUrl}{path}{queryString}";

            // Create new request message
            var requestMessage = new HttpRequestMessage
            {
                Method = new HttpMethod(HttpContext.Request.Method),
                RequestUri = new Uri(fullPath)
            };

            // Copy headers (except Host)
            foreach (var header in HttpContext.Request.Headers)
            {
                if (header.Key.Equals("Host", StringComparison.OrdinalIgnoreCase))
                    continue;

                if (!requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray()))
                {
                    requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
                }
            }

            // Copy request body for POST/PUT/PATCH
            if (HttpContext.Request.ContentLength > 0)
            {
                var bodyStream = new MemoryStream();
                await HttpContext.Request.Body.CopyToAsync(bodyStream);
                bodyStream.Position = 0;
                requestMessage.Content = new StreamContent(bodyStream);
                
                if (HttpContext.Request.ContentType != null)
                {
                    requestMessage.Content.Headers.Add("Content-Type", HttpContext.Request.ContentType);
                }
            }

            // Forward the request
            var response = await _httpClient.SendAsync(requestMessage);
            var responseContent = await response.Content.ReadAsStringAsync();

            // Copy response headers
            foreach (var header in response.Headers)
            {
                HttpContext.Response.Headers[header.Key] = header.Value.ToArray();
            }

            foreach (var header in response.Content.Headers)
            {
                HttpContext.Response.Headers[header.Key] = header.Value.ToArray();
            }

            // Return response
            return new ContentResult
            {
                StatusCode = (int)response.StatusCode,
                Content = responseContent,
                ContentType = response.Content.Headers.ContentType?.ToString()
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error proxying request to Task API");
            return StatusCode(500, "Gateway: Error communicating with Task API");
        }
    }
}