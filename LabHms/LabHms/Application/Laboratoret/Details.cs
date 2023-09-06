using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Presistence;

namespace Application.Laboratoret
{
    public class Details
    {
         public class Query : IRequest<Result<Laboratori>>
        { 
            public Guid Lab_Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Laboratori>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Laboratori>> Handle(Query request, CancellationToken cancellationToken)
            {
                var laboratori = await _context.Laboratort.FindAsync(request.Lab_Id);

                return Result<Laboratori>.Success(laboratori);
            }
        }
    }
}