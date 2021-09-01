using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.Raportet
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Raport Raport { set; get; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var raport = await this.context.Raportet.FindAsync(request.Raport.Raport_Id);
                this.mapper.Map(request.Raport,raport);
                await this.context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}