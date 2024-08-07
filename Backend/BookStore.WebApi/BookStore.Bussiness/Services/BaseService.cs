using BookStore.Businesses.Interfaces;
using BookStore.Datas.Interfaces;

namespace BookStore.Businesses.Services
{
    public class BaseService<TViewModel, TEntity, TCreate, TUpdate> 
        : IBaseService<TViewModel, TCreate, TUpdate> where TViewModel : class where TEntity : class where TCreate : class where TUpdate : class
    {
        private readonly IBaseRepository<TEntity> _baseRepository;

        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
        }

        protected virtual TEntity ChangeToEntity (TViewModel viewModel) => throw new NotImplementedException();
        protected virtual TEntity ChangeToEntity (TCreate create) => throw new NotImplementedException();
        protected virtual TEntity ChangeToEntity (TUpdate update) => throw new NotImplementedException();
        protected virtual TViewModel ChangeToViewModel (TEntity entity) => throw new NotImplementedException();

        public async Task<int> CreateAsync(TCreate create)
        {
            return await _baseRepository.CreateAsync(ChangeToEntity(create));
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            return await _baseRepository.DeleteAsync(id);
        }

        public virtual async Task<IEnumerable<TViewModel>> GetAllAsync(string[] includes = null)
        {
            var entities = await _baseRepository.GetAllAsync(includes);
            return entities.Select(x => ChangeToViewModel(x));
        }

        public async Task<TViewModel> GetByIdAsync(Guid id, string[] includes = null)
        {
            return ChangeToViewModel(await _baseRepository.GetByIdAsync(id));
        }

        public async Task<int> UpdateAsync(Guid id, TUpdate update)
        {
            return await _baseRepository.UpdateAsync(id, ChangeToEntity(update));
        }
    }
    
}
