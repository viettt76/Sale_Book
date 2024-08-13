using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Bussiness.ViewModel.CartItem
{
    public class CartItemViewModel
    {
        public int Id { get; set; }

        public int CartId { get; set; }

        public int BookId { get; set; }

        public string BookName { get; set; }

<<<<<<< HEAD
=======
        public string BookImage { get; set; }

>>>>>>> 11075048ff0f24e43d1fa0ac6a6b5af00c0ea429
        public decimal BookPrice { get; set; }

        public int Quantity { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
