using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.Ambulancat
{
    public class Edit
    {
          public class Command : IRequest
        {
            public Ambulanca Ambulanca { set; get; }

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
                var ambulanca = await this.context.Ambulancat.FindAsync(request.Ambulanca.Amb_Id);
                this.mapper.Map(request.Ambulanca,ambulanca);
                await this.context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}