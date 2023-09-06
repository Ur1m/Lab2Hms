using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Therapies
{
    public class Create
    {
        public class Command : IRequest
        {
            public Therapy Therapy { get; set; }
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
                this.context.Therapies.Add(request.Therapy); 
                await this.context.SaveChangesAsync();
                return Unit.Value;

            }
        }
    }
}