﻿using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class CartRepository : BaseRepository<Cart>, ICartRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public CartRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Cart> GetCartByUserId(string userId, string[] includes = null)
        {
            IQueryable<Cart> cart = _dbContext.Carts;

            if (includes != null && includes.Count() > 0)
            {
                cart = cart.Include(includes.First());

                foreach (var include in includes)
                {
                    cart = cart.Include(include);
                }
            }

            var res = cart.SingleOrDefault(x => x.UserId == userId);

            return res;
        }

        public async Task<int> UpdateQuantity(int id, int quantity)
        {
            var enitity = await _dbContext.Carts.FindAsync(id);

            if (enitity == null)
            {
                return 0;
            }

            //enitity.Quantity = quantity;

            return await _dbContext.SaveChangesAsync();
        }
    }
}
