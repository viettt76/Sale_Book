using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    public class PublisherController : BaseController<PublisherViewModel, PublisherCreateViewModel, PublisherUpdateViewModel>
    {
        public PublisherController(IPublisherService publisherService) : base(publisherService)
        {
        }
    }
}
