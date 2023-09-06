using Domain;
using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Application.ShtreteritNeDhoma
{
    public class Details
    {

       public class Query : IRequest<ShtreteritNeDhome>
        {

            public Guid ShtreteritNeDhome_Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, ShtreteritNeDhome>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<ShtreteritNeDhome> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.ShtreteritNeDhome.FindAsync(request.ShtreteritNeDhome_Id);
            }
        }
    }
}