using BookStore.Bussiness.ViewModel.OrderItem;
using BookStore.Models.Enums;
using BookStore.Models.Models;

namespace BookStore.Bussiness.ViewModel.Order
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public decimal TotalAmount { get; set; }
        public StatusEnum Status { get; set; }
        public DateTime Date { get; set; }
        public IEnumerable<OrderItemViewModel> OrderItems { get; set; }
    }
}
