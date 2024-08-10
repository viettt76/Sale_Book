using BookStore.Businesses.Interfaces;
using BookStore.Businesses.Services;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Bussiness.ViewModel.Review;

namespace BookStore.Bussiness.Interfaces
{
    public interface IReviewService : IBaseService<RegisterViewModel, ReviewCreateViewModel, ReviewUpdateViewModel>
    {
    }
}
