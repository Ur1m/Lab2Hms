using Domain;
using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.llojiShtreterve
{
    public class Create
    {

        public class Command : IRequest
        { 
            public llojiShtratit llojiShtratit { get; set; }
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
                _context.llojeteShtreterve.Add(request.llojiShtratit);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
