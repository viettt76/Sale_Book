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

        [HttpPut]
        [Route("update-quantity/{id}")]
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
