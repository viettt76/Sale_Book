using BookStore.Models.Models;

namespace BookStore.Bussiness.ViewModel.Voucher
{
    public class VoucherUserViewModel
    {
        public int VoucherId { get; set; }
        public string UserId { get; set; }
        public int Percent { get; set; }
        public bool Used { get; set; } = false;
    }
}
