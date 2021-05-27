using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Faturat
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Fatura_Id { get; set; }
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
                var fatura = await _context.Faturat.FindAsync(request.Fatura_Id);

                _context.Remove(fatura);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
