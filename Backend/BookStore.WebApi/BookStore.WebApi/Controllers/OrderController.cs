using AutoMapper;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Order;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        /// <summary>
        /// Hiển thị các đơn hàng của user
        /// </summary>
        /// <param name="spec">
        /// Status: có các trạng thái sau
        /// - Đã Thanh toán: 1
        /// - Chưa thanh toán: 2
        /// - Đã hủy: 0
        /// - Hiển thị tất cả: 15
        /// Sorted: mặc định sắp xếp theo ngày
        /// 
        /// </param>
        /// <returns></returns>
        [HttpGet]
        [Route("get-order")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetOrder([FromQuery] OrderSpecification spec)
        {
            try
            {
                var res = await _orderService.GetOrder(spec);

                if (res == null)
                    return BadRequest();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("order")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateOrder (OrderCreateViewModel create)
        {
            try
            {
                var res = await _orderService.CreateAsync(create);

                if (res == 0)
                    return BadRequest();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("cancelled-order/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CancelledOrder(int id)
        {
            try
            {
                var res = await _orderService.CancelledOrder(id);

                if (res == 0)
                    return BadRequest();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
