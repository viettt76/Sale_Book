using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IBookRepository : IBaseRepository<Book>
    {
        Task<List<string>> GetAuthorNamesByBookIdAsync(int id);
        Task<int> UpdateBookAverageRate(int bookId, double averageRate);
    }
}
