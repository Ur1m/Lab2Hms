using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Presistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Departmentet
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var department = await _context.Departmentet.FindAsync(request.Department.Department_id);

                if(department == null) return null;

                _mapper.Map(request.Department, department);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi ndryshimi i departamentit");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
