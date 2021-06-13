using ApiOnlineShop.Entities;
using System.Threading.Tasks;

namespace ApiOnlineShop.Interfaces
{
    public interface ILog
    {
        Task LogToDataBase(Log log);
    }
}
