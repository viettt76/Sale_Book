namespace BookStore.Bussiness.ViewModel.Cart
{
    public class CartViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public string BookName { get; set; }
        public decimal BookPrice { get; set; }
    }
}
