using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.Therapies
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Therapy Therapy { set; get; }

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
                var therapy = await this.context.Therapies.FindAsync(request.Therapy.Therapy_Id);
                this.mapper.Map(request.Therapy,therapy);
                await this.context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}