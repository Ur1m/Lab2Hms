using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.Laboratoret
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Laboratori Laboratori { set; get; }

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
                var laboratori = await this.context.Laboratort.FindAsync(request.Laboratori.Lab_Id);
                this.mapper.Map(request.Laboratori,laboratori);
                await this.context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}