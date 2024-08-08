using BookStore.Models.Models;

namespace BookStore.Bussiness.ViewModel
{
    public class PublisherViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}
