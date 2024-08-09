using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class BookRepository : BaseRepository<Book>, IBookRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public BookRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<string>> GetAuthorNamesByBookIdAsync(int id)
        {
            var query = await _dbContext.Books
                .Include(x => x.BookAuthors)
                .ThenInclude(x => x.Author)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (query == null)
            {
                return null;
            }

            var authorNames = query.BookAuthors.Select(ba => ba.Author.FullName).ToList();

            return authorNames;
        }

        public override async Task<Book> GetByIdAsync(int id, string[] includes = null)
        {
            IQueryable<Book> query = _dbContext.Books;

            if (includes != null && includes.Count() > 0)
            {
                query = query.Include(includes.First());
                foreach (var include in includes.Skip(1))
                {
                    query = query.Include(include);
                }
            }

            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
