using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Therapies
{
    public class Details
    {
        public class Query : IRequest<Therapy>
        {
            public Guid Therapy_Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Therapy>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Therapy> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Therapies.FindAsync(request.Therapy_Id);
            }
        }
    }
}