using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.caktoShtreterit
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid caktoShtratin_id { get; set; }
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
                var caktoShtratin = await _context.caktoShtreterit.FindAsync(request.caktoShtratin_id);

                _context.Remove(caktoShtratin);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
