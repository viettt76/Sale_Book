﻿using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Bussiness.ViewModel.Review;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    public class ReviewController : BaseController<ReviewViewModel, ReviewCreateViewModel, ReviewUpdateViewModel>
    {
        private readonly IReviewService _reviewService;
        private readonly UserManager<User> _userManager;

        public ReviewController(IReviewService reviewService, UserManager<User> userManager) : base(reviewService)
        {
            _reviewService = reviewService;
            _userManager = userManager;
        }

        public override async Task<IActionResult> Create([FromBody] ReviewCreateViewModel viewModel)
        {
            try
            {
                viewModel.UserId = _userManager.GetUserId(User);
                var res = await _reviewService.CreateAsync(viewModel);

                if (res == 0)
                {
                    return BadRequest();
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public override async Task<IActionResult> Update(int id, [FromBody] ReviewUpdateViewModel createUpdate)
        {
            try
            {
                var review = await _reviewService.GetByIdAsync(id);
                var userId = _userManager.GetUserId(User);

                if (review.UserId != userId)
                    return BadRequest("Bạn không thể sửa review của người khác!");

                if (review.BookId != createUpdate.BookId) 
                    return BadRequest("Bạn đang sửa review củ sách khác với sách ban đầu!");

                var res = await _reviewService.UpdateAsync(id, createUpdate);

                if (res == 0)
                {
                    return BadRequest();
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
