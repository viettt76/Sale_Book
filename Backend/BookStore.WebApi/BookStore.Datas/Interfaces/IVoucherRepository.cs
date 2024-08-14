using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IVoucherRepository : IBaseRepository<Voucher>
    {
        Task<VoucherUser> GetVoucherUserById(int voucherId, string userId, string[] includes = null);
        Task<List<VoucherUser>> GetVouchersOfUser(string userId, string[] includes = null);
        Task<int> UseVoucher(int VoucherId, string userId);
        Task<int> UserClaimVoucher(int voucherId, string userId);

    }
}
