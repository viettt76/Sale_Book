namespace BookStore.Bussiness.ViewModel.Cart
{
    public class CartCreateViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}
