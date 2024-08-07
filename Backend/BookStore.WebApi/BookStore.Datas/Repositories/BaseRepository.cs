using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthcareAppointment.Data.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        private readonly BookStoreDbContext _dbContext;
        private readonly DbSet<TEntity> _dbSet;

        public BaseRepository(BookStoreDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TEntity>();
        }

        public async Task<int> CreateAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            var del = await _dbSet.FindAsync(id);
            if (del != null)
            {
                _dbSet.Remove(del);
                return await _dbContext.SaveChangesAsync();
            }

            return 0;
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(string[] includes = null)
        {
            return _dbSet.AsEnumerable();
        }

        public async Task<TEntity> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<int> UpdateAsync(Guid id, TEntity entity)
        {
            _dbSet.Update(entity);
            return await _dbContext.SaveChangesAsync();
        }
    }
}
