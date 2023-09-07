using MongoDB.Driver;
using ProcessPayment.Models;

namespace ProcessPayment.Repositories.DbConfig
{
    public interface IDbClient
    {
        IMongoCollection<Payment> GetPaymentCollection();
    }
}
