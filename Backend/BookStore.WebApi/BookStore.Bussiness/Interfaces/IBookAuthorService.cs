using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel;

namespace BookStore.Bussiness.Interfaces
{
    public interface IBookAuthorService : IBaseService<BookAuthorViewModel, BookAuthorCreateViewModel, BookAuthorUpdateViewModel>
    {
    }
}
