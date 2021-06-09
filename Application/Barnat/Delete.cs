using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Barnat
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Barnat_Id { get; set; }
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
             var barna =await this.context.Barnat.FindAsync(request.Barnat_Id);
             this.context.Remove(barna);
             await this.context.SaveChangesAsync();
             return Unit.Value;
            }
        }
    }
}