using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<LoginController> _logger;

        public LoginController(IAuthService authService, ILogger<LoginController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel login)
        {
            try
            {
                var res = await _authService.Login(login);

                if (res == null)
                    return BadRequest("Không thể đăng nhập");

                return Ok(res); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel register)
        {
            try
            {
                var res = await _authService.Register(register);

                if (res == null)
                    return BadRequest("Không thể đăng ký người dùng mới");

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("refress-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestViewModel request)
        {
            try
            {
                var res = await _authService.RefreshToken(request);

                if (res == null)
                    return BadRequest("Không thể làm mới token");

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }
    }
}
