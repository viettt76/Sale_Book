using BookStore.Models.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel
{
    public class BookViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string? Description { get; set; }

        public string? Image { get; set; }

        // public string Author { get; set; }

        public decimal Price { get; set; }

        public double Rate { get; set; } = 0.0;

        public int BookGroupId { get; set; }
        public string BookGroupName { get; set; }
        // public BookGroupViewModel BookGroup { get; set; }


        public int PublisherId { get; set; }
        public string PublisherName { get; set; }
        // public PublisherViewModel Publisher { get; set; }

        public DateTime PublishedAt { get; set; }

        public List<string> AuthorName { get; set; }
    }
}
