using AutoMapper;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.ViewModel;
using BookStore.Models.Models;

namespace BookStore.Bussiness.ObjectMapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Publisher, PublisherViewModel>();            
            CreateMap<PublisherViewModel, Publisher>();
            CreateMap<PublisherCreateViewModel, Publisher>();
            CreateMap<PublisherUpdateViewModel, Publisher>();

            CreateMap(typeof(PaginationList<>), typeof(PaginationList<>))
                .ConvertUsing(typeof(PaginatedListConverter<,>));
        }
    }
}
