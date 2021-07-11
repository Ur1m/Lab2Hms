using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;
using System;
using System.Collections.Generic;
using System.Linq;
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
                var fatura = await _context.Faturat.Where(x => x.Fatura_Id == request.Fatura_Id).Include(x => x.Pacient).FirstOrDefaultAsync();
                return fatura;
            }
        }
    }
}