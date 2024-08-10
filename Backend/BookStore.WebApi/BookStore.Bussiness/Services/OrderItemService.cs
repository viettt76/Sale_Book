using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.OrderItem;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.Services
{
    public class OrderItemService : BaseService<OrderItemViewModel, OrderItem, OrderItemCreateViewModel, OrderItemUpdateViewModel>, IOrserItemService
    {
        public OrderItemService(IOrderItemRepository orderItemRepository, IMapper mapper) : base(orderItemRepository, mapper)
        {
        }
    }
}
