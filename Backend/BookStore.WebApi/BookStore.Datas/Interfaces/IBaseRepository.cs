namespace BookStore.Datas.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync(string[] includes = null);
        Task<TEntity> GetByIdAsync(Guid id);
        Task<int> DeleteAsync(Guid id);
        Task<int> UpdateAsync(Guid id, TEntity entity);
        Task<int> CreateAsync(TEntity entity);

    }
}
