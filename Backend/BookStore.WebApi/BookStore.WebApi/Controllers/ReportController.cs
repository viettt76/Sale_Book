using BookStore.Bussiness.Interfaces;
using BookStore.Datas.DbContexts;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;
        private readonly UserManager<User> _userManager;
        private readonly BookStoreDbContext _dbContext;
        private readonly ILogger<ReportController> _logger;

        public ReportController(IReportService reportService, UserManager<User> userManager, BookStoreDbContext dbContext, ILogger<ReportController> logger)
        {
            _reportService = reportService;
            _userManager = userManager;
            _dbContext = dbContext;
            _logger = logger;
        }

        /// <summary>
        /// Tạo báo cáo 
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample request:
        /// 
        /// GET: /api/v1.0/
        /// </remarks>
        [HttpGet]
        public async Task<IActionResult> GetReport(string? type)
        {
            try
            {
                if (type == "DAY")
                {
                    var rep = from o in _dbContext.Orders
                              join oi in _dbContext.OrderItems on o.Id equals oi.OrderId
                              where o.Status == OrderStatusEnum.DaGiaoHang
                              group new { oi, o } by o.Date.Day into g
                              select new
                              {
                                  Key = g.Key,
                                  NumberOfBookSold = g.Sum(x => x.oi.Quantity),
                                  Revenue = g.Sum(x => x.o.TotalAmount) // assuming UnitPrice is in OrderItems
                              };

                    return Ok(rep.ToList());
                }

                if (type == "MONTH")
                {
                    var rep = from o in _dbContext.Orders
                              join oi in _dbContext.OrderItems on o.Id equals oi.OrderId
                              where o.Status == OrderStatusEnum.DaGiaoHang
                              group new { oi, o } by o.Date.Month into g
                              select new
                              {
                                  Key = g.Key,
                                  NumberOfBookSold = g.Sum(x => x.oi.Quantity),
                                  Revenue = g.Sum(x => x.o.TotalAmount) // assuming UnitPrice is in OrderItems
                              };

                    return Ok(rep.ToList());
                }

                if (type == "YEAR")
                {
                    var rep = from o in _dbContext.Orders
                              join oi in _dbContext.OrderItems on o.Id equals oi.OrderId
                              where o.Status == OrderStatusEnum.DaGiaoHang
                              group new { oi, o } by o.Date.Year into g
                              select new
                              {
                                  Key = g.Key,
                                  NumberOfBookSold = g.Sum(x => x.oi.Quantity),
                                  Revenue = g.Sum(x => x.o.TotalAmount) // assuming UnitPrice is in OrderItems
                              };

                    return Ok(rep.ToList());
                }

                var repDay = from o in _dbContext.Orders
                          join oi in _dbContext.OrderItems on o.Id equals oi.OrderId
                          where o.Status == OrderStatusEnum.DaGiaoHang
                          group new { oi, o } by o.Date.Day into g
                          select new
                          {
                              Key = g.Key,
                              NumberOfBookSold = g.Sum(x => x.oi.Quantity),
                              Revenue = g.Sum(x => x.o.TotalAmount) // assuming UnitPrice is in OrderItems
                          };

                return Ok(repDay.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
