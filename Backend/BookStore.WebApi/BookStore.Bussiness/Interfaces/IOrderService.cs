using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Order;

namespace BookStore.Bussiness.Interfaces
{
    public interface IOrderService : IBaseService<OrderViewModel, OrderCreateViewModel, OrderUpdateViewModel>
    {
        Task<IEnumerable<OrderViewModel>> GetOrder(OrderSpecification spec);
        Task<int> CancelledOrder(int id);
    }
}
