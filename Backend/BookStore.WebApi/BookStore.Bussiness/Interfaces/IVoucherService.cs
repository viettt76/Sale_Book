using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Voucher;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Interfaces
{
    public interface IVoucherService : IBaseService<VoucherViewModel, VoucherCreateViewModel, VoucherUpdateViewModel>
    {
        Task<VoucherUserViewModel> GetVoucherUserById(int voucherId, string userId, string[] includes = null);
        Task<List<VoucherUserViewModel>> GetVoucherOfUser(string userId, string[] includes = null);
        Task<int> UseVoucher(int VoucherId, string userId);
        Task<int> UserClaimVoucher(int voucherId, string userId);
    }
}
