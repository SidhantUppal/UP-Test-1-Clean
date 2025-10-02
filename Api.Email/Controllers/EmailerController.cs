using Microsoft.AspNetCore.Mvc;

namespace Api.Email.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailerController : ControllerBase
    {
        private readonly ILogger<EmailerController> _logger;

        public EmailerController(ILogger<EmailerController> logger)
        {
            _logger = logger;
        }
    }
}
