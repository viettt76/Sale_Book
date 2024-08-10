using AutoMapper;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Models.Models;
using BookStore.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserController(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("get-user-info")]
        public async Task<IActionResult> GetUserInfo()
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return NotFound(new ErrorDetails (StatusCodes.Status404NotFound, "Không tồn tại user"));
                }

                if (user.IsActive == true)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, "Tài khoản đã bị khóa"));
                }

                var uservm = _mapper.Map<UserViewModel>(user);

                return Ok(uservm);
            }
            catch (Exception ex) {
                return BadRequest(new ErrorDetails (StatusCodes.Status400BadRequest, ex.Message));
            }
        }

    }
}
