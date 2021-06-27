using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.Barnat
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Barna Barna { get; set; }

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
                var barna = await this.context.Barnats.FindAsync(request.Barna.Barnat_Id);
                this.mapper.Map(request.Barna,barna);
                await this.context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}