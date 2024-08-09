using BookStore.Models.Models;
using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel
{
    public class BookGroupUpdateViewModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
