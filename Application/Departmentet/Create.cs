using Domain;
using FluentValidation;
using MediatR;
using Presistence;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Departmentet
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        { 
            public Department Department { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Department).SetValidator(new DepartmentValidator());
            }
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
                _context.Departmentet.Add(request.Department);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi krijimi i departamentit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
