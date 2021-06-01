using Application.Core;
using MediatR;
using Presistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Departmentet
{
    public class Delete
    {

        public class Command : IRequest<Result<Unit>>
        {

            public Guid Department_Id { get; set; }

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
                var department = await _context.Departmentet.FindAsync(request.Department_Id);

                // if(department == null) return null;

                _context.Remove(department);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi fshirja e departamentit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
