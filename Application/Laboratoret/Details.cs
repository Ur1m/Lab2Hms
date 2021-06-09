using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Laboratoret
{
    public class Details
    {
        public class Query : IRequest<Laboratori>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Laboratori>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Laboratori> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Laboratoret.FindAsync(request.Id);
                return activity;
            }
        }
    }
}