﻿using BookStore.Bussiness.ViewModel.OrderItem;
using BookStore.Models.Enums;

namespace BookStore.Bussiness.ViewModel.Order
{
    public class OrderCreateViewModel
    {
        public string? UserId { get; set; }
        // public decimal TotalAmount { get; set; }
        public OrderStatusEnum Status { get; set; } = OrderStatusEnum.DangXuLy;
        public DateTime Date { get; set; }
        public int VoucherId { get; set; }
        public IEnumerable<OrderItemCreateViewModel> OrderItems { get; set; }
    }
}
