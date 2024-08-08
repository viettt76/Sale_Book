using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Services
{
    public class PublisherService : BaseService<PublisherViewModel, Publisher, PublisherCreateViewModel, PublisherUpdateViewModel>, IPublisherService
    {
        private readonly IPublisherRepository _publisherRepository;
        private readonly IMapper _mapper;

        public PublisherService(IPublisherRepository publisherRepository, IMapper mapper) : base(publisherRepository, mapper)
        {
            _publisherRepository = publisherRepository;
            _mapper = mapper;
        }

        protected override Publisher ChangeToEntity(PublisherCreateViewModel create)
        {
            return _mapper.Map<Publisher>(create);
        }

        protected override Publisher ChangeToEntity(PublisherUpdateViewModel update)
        {
            return _mapper.Map<Publisher>(update);
        }

        protected override Publisher ChangeToEntity(PublisherViewModel viewModel)
        {
            return _mapper.Map<Publisher>(viewModel);
        }

        protected override PublisherViewModel ChangeToViewModel(Publisher entity)
        {
            return _mapper.Map<PublisherViewModel>(entity);
        }
    }
}
