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

        public async Task<bool> AddProduct(Product producto)
        {
            await _onlineShopContext.Products.AddAsync(producto);

            return await SaveChanges();
        }

        public async Task<bool> DeleteProduct(Product producto)
        {
            _onlineShopContext.Products.Remove(producto);

            return await SaveChanges();
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

        public async Task<bool> UpdateProduct(Product producto)
        {
            _onlineShopContext.Products.Remove(producto);

            return await SaveChanges();
        }

        private async Task<bool> SaveChanges()
        {
            return await _onlineShopContext.SaveChangesAsync() > 0;
        }
    }
}
