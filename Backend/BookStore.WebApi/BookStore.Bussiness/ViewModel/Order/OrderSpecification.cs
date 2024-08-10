using BookStore.Models.Enums;

namespace BookStore.Bussiness.ViewModel.Order
{
    public class OrderSpecification
    {
        public StatusEnum Status { get; set; } = StatusEnum.All;
        public string Sorted { get; set; } = "date";
    }
}
