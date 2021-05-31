using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Infermieret
{
    public class Delete
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var infermierja= await _context.Infermieret.FindAsync(request.Id);

                _context.Remove(infermierja);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}