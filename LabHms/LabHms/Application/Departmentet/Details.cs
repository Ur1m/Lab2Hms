using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Presistence;

namespace Application.Departmentet
{
    public class Details
    {

        public class Query : IRequest<Result<Department>>
        { 
            public Guid Department_Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Department>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Department>> Handle(Query request, CancellationToken cancellationToken)
            {
                var department = await _context.Departmentet.FindAsync(request.Department_Id);

                return Result<Department>.Success(department);
            }
        }
    }
}
