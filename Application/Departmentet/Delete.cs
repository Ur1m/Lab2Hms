using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Departmentet
{
    public class Delete
    {

        public class Command : IRequest
        {

            public Guid Department_Id { get; set; }

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
                var department = await _context.Departmentet.FindAsync(request.Department_Id);

                _context.Remove(department);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
