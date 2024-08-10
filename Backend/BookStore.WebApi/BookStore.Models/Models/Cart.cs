﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models.Models
{
    [Table("Carts")]
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int BookId { get; set; }
        [ForeignKey("BookId")]
        public Book Book { get; set; }

        public int Quantity { get; set; }
    }
}
