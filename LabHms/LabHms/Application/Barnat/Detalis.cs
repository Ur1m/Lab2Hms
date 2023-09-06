using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Barnat
{
    public class Detalis
    {
        public class Query : IRequest<Barna>
        {
            public Guid Barnat_Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Barna>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Barna> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Barnats.FindAsync(request.Barnat_Id);
            }
        }
    }
}