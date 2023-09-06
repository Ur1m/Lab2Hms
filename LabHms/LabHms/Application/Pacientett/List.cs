using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;


namespace Application.Pacientett
{
    public class List
    {
        
          public class Query : IRequest<List<Pacient>> {}

        public class Handler : IRequestHandler<Query, List<Pacient>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            
            public async Task<List<Pacient>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await  _context.pacientet.ToListAsync();
                
            }
        }
    }
}