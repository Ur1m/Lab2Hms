using Domain;
using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Application.Faturat
{
    public class Details
    {

        public class Query : IRequest<Fatura>
        {

            public Guid Fatura_Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Fatura>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<Fatura> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Faturat.FindAsync(request.Fatura_Id);
            }
        }
    }
}