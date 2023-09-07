using MongoDB.Driver;
using ProcessPayment.Models;
using ProcessPayment.Repositories.DbConfig;
using System.Threading.Tasks;

namespace ProcessPayment.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly IMongoCollection<Payment> _dbConnections;

        public PaymentRepository(IDbClient dbClient)
        {
            _dbConnections = dbClient.GetPaymentCollection();
        }

        public async Task InsertPayment(Payment payment)
        {
            _dbConnections.InsertOne(payment);
        }
    }
}
