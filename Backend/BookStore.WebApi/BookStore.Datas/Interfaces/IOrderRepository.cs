using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        Task<int> CancelledOrder(int id);
    }
}
