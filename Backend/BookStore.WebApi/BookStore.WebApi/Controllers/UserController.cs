﻿using AutoMapper;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Datas.Interfaces;
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
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(UserManager<User> userManager, IUserRepository userRepository, IMapper mapper)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Lấy danh sách tất cả các User
        /// </summary>
        /// <param name="spec"></param>
        /// <param name="pageParams"></param>
        /// <returns></returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpGet]
        [Route("all-user")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllUser([FromQuery] BaseSpecification spec, [FromQuery] PaginationParams pageParams)
        {
            try
            {
                var users = await _userRepository.GetAllAsync();

                if (users == null)
                {
                    return NotFound(new ErrorDetails (StatusCodes.Status404NotFound, "Không tìm thấy user nào"));
                }

                if (spec != null)
                {
                    if (!string.IsNullOrEmpty(spec.Filter))
                    {
                        users = users.Where(x => x.Email.Contains(spec.Filter) || x.PhoneNumber.Contains(spec.Filter));
                    }

                    users = spec.Sorting switch
                    {
                        "name" => users.OrderBy(x => x.UserName),
                        _ => users.OrderBy(x => x.UserName),
                    };
                }

                var pagingList = PaginationList<User>.Create(users, pageParams.PageNumber, pageParams.PageSize);

                var pagingList_map = _mapper.Map<PaginationList<UserViewModel>>(pagingList);

                var result = new PaginationSet<UserViewModel>(pageParams.PageNumber, pageParams.PageSize, pagingList_map.TotalCount, pagingList_map.TotalPage, pagingList_map);

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy thông tin user đang đăng nhập
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpGet]
        [Route("user-info")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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

                if (user.IsActive == false)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, "Tài khoản đã bị khóa"));
                }

                var uservm = _mapper.Map<UserViewModel>(user);

                var role = await _userManager.GetRolesAsync(user);

                if (role == null)
                {
                    uservm.Role = "No_User";
                }

                uservm.Role = role[0];

                return Ok(uservm);
            }
            catch (Exception ex) {
                return BadRequest(new ErrorDetails (StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        /// <summary>
        /// Tạo mới một user - chức năng quản lý tài khaorn cho admin
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUser (UserCreateViewModel uservm)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, "yêu cầu nhập đầy đủ các trường bắt buộc!"));

                var user = _mapper.Map<User>(uservm);

                var userResult = await _userManager.CreateAsync(user, uservm.Password);

                if (!userResult.Succeeded)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, userResult.Errors.ToList()));
                }

                var roleResult = await _userManager.AddToRoleAsync(user, uservm.Role);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }
    }
}
