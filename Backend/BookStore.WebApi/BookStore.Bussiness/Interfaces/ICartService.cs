using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Cart;

namespace BookStore.Bussiness.Interfaces
{
    public interface ICartService : IBaseService<CartViewModel, CartCreateViewModel, CartUpdateViewModel>
    {
        Task<int> UpdateQuantity(int id, int quantity);
    }
}
