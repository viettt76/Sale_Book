namespace BookStore.Businesses.Interfaces
{
    public interface IBaseService<TViewModel, TCreate, TUpdate> where TViewModel : class where TCreate : class where TUpdate : class
    {
        Task<IEnumerable<TViewModel>> GetAllAsync(string[] includes = null);
        Task<TViewModel> GetByIdAsync(Guid id, string[] includes = null);
        Task<int> CreateAsync(TCreate create);
        Task<int> UpdateAsync(Guid id, TUpdate update);
        Task<int> DeleteAsync(Guid id);
    }
}
