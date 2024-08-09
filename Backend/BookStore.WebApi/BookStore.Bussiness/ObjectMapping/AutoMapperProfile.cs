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

            CreateMap<Author, AuthorViewModel>();
            CreateMap<AuthorViewModel, Author>();
            CreateMap<AuthorCreateViewModel, Author>();
            CreateMap<AuthorUpdateViewModel, Author>();

            CreateMap<Book, BookViewModel>()
                .ForMember(x => x.BookGroupName, s => s.MapFrom(x => x.BookGroup.Name))
                .ForMember(x => x.PublisherName, s => s.MapFrom(x => x.Publisher.Name));
            CreateMap<BookViewModel, Book>();
            CreateMap<BookCreateViewModel, Book>();
            CreateMap<BookUpdateViewModel, Book>();

            CreateMap<BookGroup, BookGroupViewModel>();
            CreateMap<BookGroupViewModel, BookGroup>();
            CreateMap<BookGroupCreateViewModel, BookGroup>();
            CreateMap<BookGroupUpdateViewModel, BookGroup>();

            CreateMap<BookAuthor, BookAuthorViewModel>();
            CreateMap<BookAuthorViewModel, BookAuthor>();
            CreateMap<BookAuthorCreateViewModel, BookAuthor>();
            CreateMap<BookAuthorUpdateViewModel, BookAuthor>();

            CreateMap(typeof(PaginationList<>), typeof(PaginationList<>))
                .ConvertUsing(typeof(PaginatedListConverter<,>));
        }
    }
}
