using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Cart;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    public class CartController : BaseController<CartViewModel, CartCreateViewModel, CartUpdateViewModel>
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService) : base(cartService)
        {
            _cartService = cartService;
        }

        /// <summary>
        /// Cập nhật số lượng của sách trong giỏ hàng
        /// </summary>
        /// <param name="id"></param>
        /// <param name="quantity"></param>
        /// <returns></returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpPut]
        [Route("update-quantity/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateQuantity (int id, [FromQuery] int quantity)
        {
            try
            {
                var res = await _cartService.UpdateQuantity(id, quantity);

                if (res == 0) return BadRequest("Không thể cập nhật số lượng");

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
