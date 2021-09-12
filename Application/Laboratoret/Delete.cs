using Application.Core;
using MediatR;
using Presistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Laboratoret
{
    public class Delete
    {
          public class Command : IRequest<Result<Unit>>
        {

            public Guid Lab_Id { get; set; }

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
                var laboratori = await _context.Laboratoret.FindAsync(request.Lab_Id);


                _context.Remove(laboratori);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi fshirja e laboratorit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}