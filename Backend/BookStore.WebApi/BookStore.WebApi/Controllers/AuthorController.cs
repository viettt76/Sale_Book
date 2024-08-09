using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    public class AuthorController : BaseController<AuthorViewModel, AuthorCreateViewModel, AuthorUpdateViewModel>
    {
        public AuthorController(IAuthorService authorService) : base(authorService)
        {
        }
    }
}
