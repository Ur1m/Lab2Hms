using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Presistence;

namespace Application.TerminatKontrolles
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        { 
            public Terminet terminet { get; set; }
        }

       

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Terminet.Add(request.terminet);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Operacioni deshtoi");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}