using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Presistence;

namespace Application.Pacientett
{
    public class Details
    {
         public class Query : IRequest<Result<Pacient>>
        { 
            public Guid Pacient_Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Pacient>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Pacient>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pacineti = await _context.pacientet.FindAsync(request.Pacient_Id);

                return Result<Pacient>.Success(pacineti);
            }
        }
    }
}