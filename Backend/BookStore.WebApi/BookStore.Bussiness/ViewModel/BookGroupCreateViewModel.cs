using BookStore.Models.Models;
using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel
{
    public class BookGroupCreateViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
