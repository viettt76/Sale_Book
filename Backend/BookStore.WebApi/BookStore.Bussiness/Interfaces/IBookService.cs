using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.ViewModel;

namespace BookStore.Bussiness.Interfaces
{
    public interface IBookService : IBaseService<BookViewModel, BookCreateViewModel, BookUpdateViewModel>
    {
        Task<PaginationSet<BookViewModel>> Search(BookSpecification spec, PaginationParams pageParams);
    }
}
