using Domain;
using FluentValidation;
using MediatR;
using Presistence;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Laboratoret
{
    public class Create
    {
          public class Command : IRequest<Result<Unit>>
        { 
            public Laboratori Laboratori { get; set; }
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
                _context.Laboratort.Add(request.Laboratori);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi krijimi i laboratorit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}