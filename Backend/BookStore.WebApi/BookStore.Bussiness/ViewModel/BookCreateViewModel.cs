using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel
{
    public class BookCreateViewModel
    {
        [Required]
        [MaxLength(255)]
        [MinLength(3)]
        public string Title { get; set; }

        public string? Description { get; set; }

        public string? Image { get; set; }

        // public string Author { get; set; }

        public decimal Price { get; set; }

        [Range(0, 5)]
        public double Rate { get; set; } = 0.0;

        public int BookGroupId { get; set; }

        [Required]
        public int PublisherId { get; set; }

        public DateTime PublishedAt { get; set; }

        public List<int> AuthorId { get; set; }
    }
}
