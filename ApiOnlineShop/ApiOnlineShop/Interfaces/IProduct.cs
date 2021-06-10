using ApiOnlineShop.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiOnlineShop.Interfaces
{
    public interface IProduct
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProduct(string code);
        Task<bool> UpdateProduct(Product producto);
        Task<bool> DeleteProduct(Product producto);
        Task<bool> AddProduct(Product producto);
    }
}
