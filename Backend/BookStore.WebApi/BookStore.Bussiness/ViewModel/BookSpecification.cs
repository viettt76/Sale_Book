using BookStore.Bussiness.Extensions;

namespace BookStore.Bussiness.ViewModel
{
    public class BookSpecification : BaseSpecification
    {
        public int? BookGroupId { get; set; }
        public int? AuthorId { get; set; }
        public int? PublisherId { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
    }
}
