using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Raportet
{
    public class Details
    {
          public class Query : IRequest<Raport>
        {
            public Guid Raport_Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Raport>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Raport> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Raportet.FindAsync(request.Raport_Id);
            }
        }
    }
}