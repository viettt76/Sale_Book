using BookStore.Bussiness.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResultViewModel> Login(LoginViewModel login);
        Task<AuthResultViewModel> Register(RegisterViewModel register);
        Task<AuthResultViewModel> RefreshToken(RefreshTokenRequestViewModel request);
    }
}
