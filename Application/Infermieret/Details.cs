using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Infermieret
{
    public class Details
    {
        public class Query : IRequest<Infermierja>
        {
            public Guid Infermierja_Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Infermierja>
        {
            private readonly DataContext __context;
            public Handler(DataContext _context)
            {
                this.__context = _context;
            }

            public async Task<Infermierja> Handle(Query request, CancellationToken cancellationToken)
            {
                return await __context.Infermieret.FindAsync(request.Infermierja_Id);            }
        }
    }
}