using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    public class BookController : BaseController<BookViewModel, BookCreateViewModel, BookUpdateViewModel>
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService) : base(bookService)
        {
            _bookService = bookService;
        }

        public override async Task<IActionResult> GetAllPaging([FromQuery] BaseSpecification spec, [FromQuery] PaginationParams pageParams)
        {
            try
            {
                var res = await _bookService.GetAllPagingAsync(spec, pageParams, new[] { "BookGroup", "Publisher" } );

                if (res == null)
                {
                    return NotFound();
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public override async Task<IActionResult> GetById(int id)
        {
            try
            {
                var res = await _bookService.GetByIdAsync(id, new[] { "BookGroup", "Publisher" });

                if (res == null)
                {
                    return NotFound();
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> Search([FromQuery] BookSpecification spec, [FromQuery] PaginationParams pageParams)
        {
            try
            {                
                var res = await _bookService.Search(spec, pageParams);

                if (res == null || res.Datas == null || res.Datas.Count() == 0)
                    return NotFound("Không tìm thấy!");

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
