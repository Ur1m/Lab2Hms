using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Barnat
{
    public class Create
    {
        public class Command : IRequest
        {
            public Barna Barna { get; set; }
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
                this.context.Barnat.Add(request.Barna);
                 await this.context.SaveChangesAsync();
                 return Unit.Value;
            }
        }
    }
}