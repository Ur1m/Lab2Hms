using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Presistence;

namespace Application.Pacientett
{
  
        public class Create
    {
        public class Command : IRequest<Result<Unit>>
        { 
            public Pacient Pacienti { get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Pacienti).SetValidator(new PacinetatValidator());
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
                _context.pacientet.Add(request.Pacienti);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Operacioni deshtoiS");

                return Result<Unit>.Success(Unit.Value);
            }
        }
        
    }
}
