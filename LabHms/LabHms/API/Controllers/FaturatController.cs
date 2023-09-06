using Application.Faturat;
using Domain;
using Event.ProductsContract;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class FaturatController : BaseApiController
    {
        private readonly ISendEndpointProvider _sendEndpointProvider;

        public FaturatController(ISendEndpointProvider sendEndpointProvider)
        {
            _sendEndpointProvider = sendEndpointProvider;
        }
        [HttpGet]

        public async Task<ActionResult<List<Fatura>>> GetFaturat()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{Fatura_Id}")]
        public async Task<ActionResult<Fatura>> GetFatura(Guid Fatura_Id)
        {
            return await Mediator.Send(new Details.Query { Fatura_Id = Fatura_Id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateFatura(Fatura fatura)
        {
            try
            {
                var endpoint = await _sendEndpointProvider.GetSendEndpoint(new Uri("queue:ProcessPayment"));
                var payment = new ProcessPaymentDto()
                {
                    CardNumber = "32123 123 123 123",
                    Cvc = "421",
                    Month = "05",
                    Year = "2030",
                    Value = fatura.Shuma
                };
                await endpoint.Send(payment);
                return Ok(await Mediator.Send(new Create.Command { Fatura = fatura }));
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [HttpPut("{Fatura_Id}")]
        public async Task<IActionResult> EditFatura(Guid Fatura_Id, Fatura fatura)
        {
            fatura.Fatura_Id = Fatura_Id;
            return Ok(await Mediator.Send(new Edit.Command { Fatura = fatura }));
        }

        [HttpDelete("{Fatura_Id}")]
        public async Task<IActionResult> DeleteFatura(Guid Fatura_Id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Fatura_Id = Fatura_Id }));
        }

    }
}
