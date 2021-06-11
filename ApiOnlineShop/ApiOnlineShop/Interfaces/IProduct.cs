using ApiOnlineShop.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiOnlineShop.Interfaces
{
    public interface IProduct
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProduct(string code);
        Task UpdateProduct(Product product);
        Task DeleteProduct(Product product);
        Task AddProduct(Product product);
        Task<bool> Exists(string code);
    }
}
