using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Order;
using BookStore.Models.Enums;

namespace BookStore.Bussiness.Interfaces
{
    public interface IOrderService : IBaseService<OrderViewModel, OrderCreateViewModel, OrderUpdateViewModel>
    {
        Task<IEnumerable<OrderViewModel>> GetOrder(OrderSpecification spec);
        Task<int> CancelledOrder(int id);
        Task<int> UpdateOrderStatus(int id, OrderStatusEnum statusOrder);
    }
}
