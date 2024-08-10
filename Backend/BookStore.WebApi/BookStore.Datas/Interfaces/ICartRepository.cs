using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface ICartRepository : IBaseRepository<Cart>
    {
        Task<int> UpdateQuantity(int id, int quantity);
    }
}
