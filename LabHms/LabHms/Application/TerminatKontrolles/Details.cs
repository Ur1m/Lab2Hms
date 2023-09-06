using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Presistence;

namespace Application.TerminatKontrolles
{
    public class Details
    {
         public class Query : IRequest<Result<Terminet>>
        { 
            public Guid terapia_ID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Terminet>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Terminet>> Handle(Query request, CancellationToken cancellationToken)
            {
                var termini = await _context.Terminet.FindAsync(request.terapia_ID);

                return Result<Terminet>.Success(termini);
            }
        }
    }
}