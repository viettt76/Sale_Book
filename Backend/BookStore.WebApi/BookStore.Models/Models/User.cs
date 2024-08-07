using Microsoft.AspNetCore.Identity;

namespace BookStore.Models.Models
{
    public class User : IdentityUser
    {
        public bool IsActive { get; set; } = true;
    }
}
