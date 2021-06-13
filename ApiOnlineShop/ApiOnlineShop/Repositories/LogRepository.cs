using ApiOnlineShop.Entities;
using ApiOnlineShop.Interfaces;
using System.Threading.Tasks;

namespace ApiOnlineShop.Repositories
{
    public class LogRepository : ILog
    {
        private readonly OnlineShopContext _onlineShopContext;

        public LogRepository(OnlineShopContext onlineShopContext)
        {
            _onlineShopContext = onlineShopContext;
        }

        public async Task LogToDataBase(Log log)
        {
            await _onlineShopContext.Logs.AddAsync(log);

            await _onlineShopContext.SaveChangesAsync();
        }
    }
}
