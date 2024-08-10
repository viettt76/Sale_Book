﻿using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.OrderItem;

namespace BookStore.Bussiness.Interfaces
{
    public interface IOrserItemService : IBaseService<OrderItemViewModel, OrderItemCreateViewModel, OrderItemUpdateViewModel>
    {
    }
}
