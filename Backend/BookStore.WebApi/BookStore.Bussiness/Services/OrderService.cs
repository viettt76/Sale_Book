using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Order;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Services
{
    public class OrderService : BaseService<OrderViewModel, Order, OrderCreateViewModel, OrderUpdateViewModel>, IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, 
            IOrderItemRepository orderItemRepository, 
            IBookRepository bookRepository, IMapper mapper) : base(orderRepository, mapper)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        protected override Order ChangeToEntity(OrderCreateViewModel create)
        {
            return _mapper.Map<Order>(create);
        }

        protected override Order ChangeToEntity(OrderUpdateViewModel update)
        {
            return _mapper.Map<Order>(update);
        }

        protected override Order ChangeToEntity(OrderViewModel viewModel)
        {
            return _mapper.Map<Order>(viewModel);
        }

        protected override OrderViewModel ChangeToViewModel(Order entity)
        {
            return _mapper.Map<OrderViewModel>(entity);
        }

        public override async Task<int> CreateAsync(OrderCreateViewModel create)
        {
            if (create.OrderItems == null || create.OrderItems.Count() == 0)
            {
                return 0;
            }

            var books = new List<Book>();
            foreach (var item in create.OrderItems)
            {
                var book = await _bookRepository.GetByIdAsync(item.BookId);

                item.Price = book.Price;
            }

            create.TotalAmount = create.OrderItems.Sum(x => x.Quantity * x.Price);

            var order = await _orderRepository.CreateAsync(ChangeToEntity(create));

            if (order == null)
            {
                return 0;
            }



            return 1;
        }

        public async Task<IEnumerable<OrderViewModel>> GetOrder(OrderSpecification spec)
        {
            var entities = await _orderRepository.GetAllAsync(new[] { "OrderItems" });

            if (spec != null)
            {
                if (spec.Status != Models.Enums.StatusEnum.All)
                    entities = entities.Where(x => x.Status == spec.Status);

                entities = spec.Sorted switch
                {
                    "date" => entities.OrderBy(x => x.Date),
                    _ => entities.OrderBy(x => x.Date),
                };
            }

            var vm = entities.Select(x => ChangeToViewModel(x)).ToList();

            return vm;
        }

        public async Task<int> CancelledOrder(int id)
        {
            var res = await _orderRepository.CancelledOrder(id);

            if (res == 0)
                return 0;

            return res;
        }
    }
}
