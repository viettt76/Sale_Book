using BookStore.Models.Models;

namespace BookStore.Bussiness.ViewModel.Voucher
{
    public class VoucherViewModel
    {
        public int Id { get; set; }
        public int Percent { get; set; }

        public List<VoucherUserViewModel> VoucherUsers { get; set; }
    }
}
