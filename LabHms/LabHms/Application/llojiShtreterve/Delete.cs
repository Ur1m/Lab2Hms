using MediatR;
using Presistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.llojiShtreterve
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid llojiShtratit_id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var llojiShtratit = await _context.llojeteShtreterve.FindAsync(request.llojiShtratit_id);

                _context.Remove(llojiShtratit);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
