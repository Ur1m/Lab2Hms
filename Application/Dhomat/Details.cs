using Domain;
using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Application.Dhomat
{
    public class Details
    {

        public class Query : IRequest<Dhoma>
        {

            public Guid Dhoma_Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Dhoma>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<Dhoma> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Dhomat.FindAsync(request.Dhoma_Id);
            }
        }
    }
}