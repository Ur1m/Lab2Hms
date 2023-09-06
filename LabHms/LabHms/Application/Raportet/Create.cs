using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Raportet
{
    public class Create
    {
        public class Command : IRequest
        {
            public Raport Raport { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                this.context.Raportet.Add(request.Raport); 
                await this.context.SaveChangesAsync();
                return Unit.Value;

            }
        }
    }
}