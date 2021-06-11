using ApiOnlineShop.Entities;
using ApiOnlineShop.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiOnlineShop.Repositories
{
    public class ProductRepository : IProduct
    {
        private readonly OnlineShopContext _onlineShopContext;

        public ProductRepository(OnlineShopContext onlineShopContext)
        {
            _onlineShopContext = onlineShopContext;
        }

        public async Task AddProduct(Product product)
        {
            await _onlineShopContext.Products.AddAsync(product);

            await SaveChanges();
        }

        public async Task DeleteProduct(Product product)
        {
            _onlineShopContext.Products.Remove(product);

            await SaveChanges();
        }

        public async Task<bool> Exists(string code)
        {
            var product = await _onlineShopContext.Products.FindAsync(code);

            if (product == null) return false;

            return true;
        }

        public async Task<Product> GetProduct(string code)
        {
            var product = await _onlineShopContext.Products.FindAsync(code);

            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await _onlineShopContext.Products.ToListAsync();

            return products;
        }

        public async Task UpdateProduct(Product product)
        {
            _onlineShopContext.Products.Update(product);

            await SaveChanges();
        }

        private async Task SaveChanges()
        {
            await _onlineShopContext.SaveChangesAsync();
        }
    }
}
