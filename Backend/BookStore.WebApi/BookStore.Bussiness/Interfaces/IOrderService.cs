using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Order;
using BookStore.Models.Enums;

namespace BookStore.Bussiness.Interfaces
{
    public interface IOrderService : IBaseService<OrderViewModel, OrderCreateViewModel, OrderUpdateViewModel>
    {
        Task<IEnumerable<OrderViewModel>> GetOrders(OrderSpecification spec);
        Task<OrderViewModel> GetOrder(int orderId, string userId, string[] includes = null);
        Task<IEnumerable<OrderViewModel>> GetOrdersUser(string userId, OrderSpecification spec, string[] includes);
        Task<int> CancelledOrder(int id);
        Task<int> UpdateOrderStatus(int id, OrderStatusEnum statusOrder);
    }
}
