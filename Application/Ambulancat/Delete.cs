using Application.Core;
using MediatR;
using Presistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Ambulancat
{
    public class Delete
    {
           public class Command : IRequest<Result<Unit>>
        {

            public Guid Amb_Id { get; set; }

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
                var ambulanca = await _context.Ambulancat.FindAsync(request.Amb_Id);


                _context.Remove(ambulanca);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi fshirja e ambulances");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}