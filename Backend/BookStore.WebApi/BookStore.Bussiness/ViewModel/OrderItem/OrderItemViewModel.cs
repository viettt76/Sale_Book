using BookStore.Models.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.ViewModel.OrderItem
{
    public class OrderItemViewModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int BookId { get; set; }
        public string BookName { get; set; }
<<<<<<< HEAD
=======
        public string BookImage { get; set; }
>>>>>>> 11075048ff0f24e43d1fa0ac6a6b5af00c0ea429
        public decimal BookPrice { get; set; }
        public int Quantity { get; set; }
    }
}
