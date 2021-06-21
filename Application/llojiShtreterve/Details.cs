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
    public class Details
    {

        public class Query : IRequest<llojiShtratit>
        {

            public Guid llojiShtratit_id { get; set; }

        }

        public class Handler : IRequestHandler<Query, llojiShtratit>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<llojiShtratit> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.llojeteShtreterve.FindAsync(request.llojiShtratit_id);
            }
        }
    }
}