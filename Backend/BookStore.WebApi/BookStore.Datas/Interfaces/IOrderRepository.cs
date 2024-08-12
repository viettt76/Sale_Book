using BookStore.Models.Enums;
using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        Task<int> CancelledOrder(int id);
        Task<int> UpdateOrderStatus(int id, OrderStatusEnum orderStatus);
    }
}
