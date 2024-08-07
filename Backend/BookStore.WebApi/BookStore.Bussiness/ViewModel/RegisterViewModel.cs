using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Username là bắt buộc!")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Email là bắt buộc!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password là bắt buộc!")]
        public string Password { get; set; }
    }
}
