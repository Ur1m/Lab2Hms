using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ShtreteritNeDhoma
{
    public class List
    {

       public class Query : IRequest<List<ShtreteritNeDhome>> { }

        public class Handler : IRequestHandler<Query, List<ShtreteritNeDhome>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ShtreteritNeDhome>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.ShtreteritNeDhome.ToListAsync();
            }
        }
    }
}
