using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.Infermieret
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Infermierja Infermierja { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var infermierja = await _context.Infermieret.FindAsync(request.Infermierja.Infermierja_Id);
              
                _mapper.Map(request.Infermierja, infermierja);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}