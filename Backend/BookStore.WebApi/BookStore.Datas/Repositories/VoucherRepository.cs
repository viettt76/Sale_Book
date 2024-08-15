using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class VoucherRepository : BaseRepository<Voucher>, IVoucherRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public VoucherRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<VoucherUser>> GetVouchersOfUser(string userId, string[] includes = null)
        {

            //if (includes != null && includes.Count() > 0)
            //{
            //    var query = _dbContext.Vouchers.Include(includes.First());
            //    foreach (var include in includes.Skip(1))
            //    {
            //        query = query.Include(include);
            //    }

            //    var res = query.Where(x => x.VoucherUsers.Any(e => e.UserId == userId)).ToList();

            //    var voucherUser = res.Where(x => x.VoucherUsers.Any(u => u.UserId == userId));

            //    var a = _dbContext.VoucherUsers.Where(x => x.UserId == userId).ToList();

            //    return res;
            //}

            var vouchers = _dbContext.VoucherUsers.Include(x => x.Voucher).Where(x => x.UserId == userId).ToList();

            return vouchers;
        }

        public async Task<VoucherUser> GetVoucherUserById(int voucherId, string userId, string[] includes = null)
        {
            var res = await _dbContext.VoucherUsers.Include(x => x.Voucher).FirstOrDefaultAsync(x => x.VoucherId == voucherId && x.UserId == userId);

            return res;
        }

        public async Task<int> UserClaimVoucher(int voucherId, string userId)
        {
            var VoucherUser = new VoucherUser
            {
                UserId = userId,
                VoucherId = voucherId,
                Used = false
            };

            await _dbContext.VoucherUsers.AddAsync(VoucherUser);

            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> UseVoucher(int VoucherId, string userId)
        {
            var voucher = _dbContext.Vouchers.FirstOrDefault(x => x.Id == VoucherId && x.VoucherUsers.Any(e => e.UserId == userId));

            if (voucher == null)
                return 0;
            voucher.VoucherUsers.First().Used = true;

            await _dbContext.SaveChangesAsync();

            return 1;
        }
    }
}
