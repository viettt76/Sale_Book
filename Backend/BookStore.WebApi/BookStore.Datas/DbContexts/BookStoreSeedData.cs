using BookStore.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Datas.DbContexts
{
    public static class BookStoreSeedData
    {
        public static async Task Initalize(IServiceProvider serviceProvider)
        {
            using (var context = new BookStoreDbContext(serviceProvider.GetRequiredService<DbContextOptions<BookStoreDbContext>>()))
            {
                var roles = new List<IdentityRole>()
                {
                    new IdentityRole("Admin"),
                    new IdentityRole("User"),
                    new IdentityRole("No_User"),
                };

                if (!context.Roles.Any())
                {
                    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                    foreach (var role in roles)
                    {
                        var roleResult = await roleManager.CreateAsync(role);
                    }
                }

                if (!context.Users.Any())
                {
                    var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

                    var user = new User
                    {
                        UserName = "admin@example.com",
                        Email = "admin@example.com",
                        PhoneNumber = "0123456789",
                        IsActive = true,
                    };

                    var userResult = await userManager.CreateAsync(user, "123456789");

                    if (userResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, roles[0].Name);
                    }
                }
            }
        }
    }
}
