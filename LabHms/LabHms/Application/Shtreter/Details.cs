using Domain;
using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Application.Shtreter
{
    public class Details
    {

        public class Query : IRequest<Shtrat>
        {

            public Guid Shtrat_id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Shtrat>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<Shtrat> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Shtreter.FindAsync(request.Shtrat_id);
            }
        }
    }
}