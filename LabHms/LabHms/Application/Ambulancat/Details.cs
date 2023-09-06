using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Presistence;


namespace Application.Ambulancat
{
    public class Details
    {
        
         public class Query : IRequest<Result<Ambulanca>>
        { 
            public Guid Amb_Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Ambulanca>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Ambulanca>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ambulanca = await _context.Ambulancat.FindAsync(request.Amb_Id);

                return Result<Ambulanca>.Success(ambulanca);
            }
        }
    }
}