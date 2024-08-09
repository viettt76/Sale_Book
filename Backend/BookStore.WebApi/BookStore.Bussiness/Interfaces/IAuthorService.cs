using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel;

namespace BookStore.Bussiness.Interfaces
{
    public interface IAuthorService : IBaseService<AuthorViewModel, AuthorCreateViewModel, AuthorUpdateViewModel>
    {
    }
}
