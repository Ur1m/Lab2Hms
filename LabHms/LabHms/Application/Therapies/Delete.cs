using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Presistence;

namespace Application.Therapies
{
    public class Delete
    {
         public class Command : IRequest<Result<Unit>>
        {

            public Guid Therapy_Id{ get; set; }

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
                var therapy = await _context.Therapies.FindAsync(request.Therapy_Id);

                

                _context.Remove(therapy);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Operacioni deshtoi");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}