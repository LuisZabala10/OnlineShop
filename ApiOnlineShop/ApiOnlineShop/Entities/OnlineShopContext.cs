using Microsoft.EntityFrameworkCore;

namespace ApiOnlineShop.Entities
{
    public class OnlineShopContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Log> Logs { get; set; } 
        public OnlineShopContext(DbContextOptions<OnlineShopContext> options) : base(options)
        {

        }
    }
}
