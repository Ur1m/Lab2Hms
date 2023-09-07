using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProcessPayment.Models;

namespace ProcessPayment.Repositories.DbConfig
{
    public class DbClient : IDbClient
    {
        private readonly IMongoCollection<Payment> _payment;
        private readonly IOptions<PaymentDbConfig> options;
        public DbClient(IOptions<PaymentDbConfig> options)
        {
            var client = new MongoClient(options.Value.Connection_String);
            var database = client.GetDatabase(options.Value.Database_Name);
            _payment = database.GetCollection<Payment>(options.Value.Payment_Collection_Name);
            this.options = options;
        }
        public IMongoCollection<Payment> GetPaymentCollection() => _payment;
    }
}
