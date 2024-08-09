using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using System.Text.Encodings.Web;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace BookStore.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<LoginController> _logger;
        private readonly IEmailSender _emailSender;
        private readonly UserManager<User> _userManager;

        public LoginController(IAuthService authService, ILogger<LoginController> logger, IEmailSender emailSender, UserManager<User> userManager)
        {
            _authService = authService;
            _logger = logger;
            _emailSender = emailSender;
            _userManager = userManager;
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

                var userId = await _userManager.GetUserIdAsync(res);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(res);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                //var callbackUrl = Url.Page(
                //"/Account/ConfirmEmail",
                //pageHandler: null,
                //values: new { area = "Identity", userId = userId, code = code, returnUrl = returnUrl },
                //        protocol: Request.Scheme);

                var callbackUrl = Url.Action("ConfirmEmail", "Login", new { userId = res.Id, token = code }, Request.Scheme);

                await _emailSender.SendEmailAsync(res.Email, "Confirm your email",
                    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

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

        [HttpGet]
        [Route("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            try
            {
                if (userId == null || token == null)
                {
                    return BadRequest("Invalid user ID");
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound($"Unable to load user with ID '{userId}'.");
                }

                token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
                var result = await _userManager.ConfirmEmailAsync(user, token);

                if (result.Succeeded)
                {
                    return Ok("Thank you for confirming your email.");
                }
                else
                {
                    return BadRequest("Error confirming your email.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }
    }
}
