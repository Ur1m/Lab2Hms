using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Shtreter
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Shtrat_id { get; set; }
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
                var shtrat = await _context.Shtreter.FindAsync(request.Shtrat_id);

                _context.Remove(shtrat);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
