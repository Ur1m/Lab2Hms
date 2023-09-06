using MassTransit;
using System.Threading.Tasks;
using System;
using Event.ProductsContract;
using ProcessPayment.Services;

namespace ProcessPayment.Consumer
{
    public class OrderConsumer : IConsumer<ProcessPaymentDto>
    {
        private readonly IPaymentService _paymentService;
        public OrderConsumer(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        public async Task Consume(ConsumeContext<ProcessPaymentDto> context)
        {
            try
            {
                var result = context.Message;

                var tt = await _paymentService.PayAsync(result.CardNumber, result.Month, result.Year, result.Cvc, result.Value);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}