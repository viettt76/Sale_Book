using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Voucher;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Services
{
    public class VoucherService 
        : BaseService<VoucherViewModel, Voucher, VoucherCreateViewModel, VoucherUpdateViewModel>, IVoucherService
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMapper _mapper;

        public VoucherService(IVoucherRepository voucherRepository, IMapper mapper) : base(voucherRepository, mapper)
        {
            _voucherRepository = voucherRepository;
            _mapper = mapper;
        }

        protected override Voucher ChangeToEntity(VoucherCreateViewModel create)
        {
            return _mapper.Map<Voucher>(create);
        }

        protected override Voucher ChangeToEntity(VoucherUpdateViewModel update)
        {
            return _mapper.Map<Voucher>(update);
        }

        protected override Voucher ChangeToEntity(VoucherViewModel viewModel)
        {
            return _mapper.Map<Voucher>(viewModel);
        }

        protected override VoucherViewModel ChangeToViewModel(Voucher entity)
        {
            return _mapper.Map<VoucherViewModel>(entity);
        }

        public async Task<List<VoucherUserViewModel>> GetVoucherOfUser(string userId, string[] includes = null)
        {
            return _mapper.Map<List<VoucherUserViewModel>>(await _voucherRepository.GetVouchersOfUser(userId, includes));
        }

        public async Task<int> UseVoucher(int VoucherId, string userId)
        {
            return await _voucherRepository.UseVoucher(VoucherId, userId);
        }

        public async Task<VoucherUserViewModel> GetVoucherUserById(int voucherId, string userId, string[] includes = null)
        {
            return _mapper.Map<VoucherUserViewModel>(await _voucherRepository.GetVoucherUserById(voucherId, userId, includes));
        }

        public async Task<int> UserClaimVoucher(int voucherId, string userId)
        {
            return await _voucherRepository.UserClaimVoucher(voucherId, userId);
        }
    }
}
