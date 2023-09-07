using ProcessPayment.Models;
using System.Threading.Tasks;

namespace ProcessPayment.Repositories
{
    public interface IPaymentRepository
    {
        Task InsertPayment(Payment payment);

    }
}
