using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Datas.Repositories
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public OrderRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> CancelledOrder(int id)
        {
            var order = await _dbContext.Orders.FindAsync(id);

            if (order == null)
            {
                return 0;
            }

            if (order.Status == StatusEnum.DaThanhToan || order.Status == StatusEnum.DaHuy)
                return 0;

            order.Status = StatusEnum.DaThanhToan;

            return await _dbContext.SaveChangesAsync();
        }
    }
}
