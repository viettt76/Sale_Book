using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Datas.Repositories
{
    public class CartRepository : BaseRepository<Cart>, ICartRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public CartRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> UpdateQuantity(int id, int quantity)
        {
            var enitity = await _dbContext.Carts.FindAsync(id);

            if (enitity == null)
            {
                return 0;
            }

            enitity.Quantity = quantity;

            return await _dbContext.SaveChangesAsync();
        }
    }
}
