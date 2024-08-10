using AutoMapper;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Bussiness.ViewModel.Author;
using BookStore.Bussiness.ViewModel.Book;
using BookStore.Bussiness.ViewModel.BookAuthor;
using BookStore.Bussiness.ViewModel.BookGroup;
using BookStore.Bussiness.ViewModel.Cart;
using BookStore.Bussiness.ViewModel.Order;
using BookStore.Bussiness.ViewModel.OrderItem;
using BookStore.Bussiness.ViewModel.Publisher;
using BookStore.Bussiness.ViewModel.Review;
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
                .ForMember(x => x.BookGroupName, s => s.MapFrom(x => x.BookGroup.Name));
                //.ForMember(x => x.PublisherName, s => s.MapFrom(x => x.Publisher.Name));
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

            CreateMap<Cart, CartViewModel>()
                .ForMember(x => x.BookName, x => x.MapFrom(e => e.Book.Title))
                .ForMember(x => x.BookPrice, x => x.MapFrom(e => e.Book.Price));
            CreateMap<CartViewModel, Cart>();
            CreateMap<CartCreateViewModel, Cart>();
            CreateMap<CartUpdateViewModel, Cart>();

            CreateMap<User, UserViewModel>();

            CreateMap<Order, OrderViewModel>();
            CreateMap<OrderViewModel, Order>();
            CreateMap<OrderCreateViewModel, Order>();
            CreateMap<OrderUpdateViewModel, Order>();

            CreateMap<OrderItem, OrderItemViewModel>();
            CreateMap<OrderItemViewModel, OrderItem>();
            CreateMap<OrderItemCreateViewModel, OrderItem>();
            CreateMap<OrderItemUpdateViewModel, OrderItem>();

            CreateMap<Review, ReviewViewModel>();
            CreateMap<ReviewViewModel, Review>();
            CreateMap<ReviewCreateViewModel, Review>();
            CreateMap<ReviewUpdateViewModel, Review>();

            CreateMap(typeof(PaginationList<>), typeof(PaginationList<>))
                .ConvertUsing(typeof(PaginatedListConverter<,>));
        }
    }
}
