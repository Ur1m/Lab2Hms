using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Dhomat
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Dhoma_Id { get; set; }
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
                var Dhoma = await _context.Dhomat.FindAsync(request.Dhoma_Id);

                _context.Remove(Dhoma);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
