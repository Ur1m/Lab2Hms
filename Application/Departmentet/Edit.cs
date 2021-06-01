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

        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var department = await _context.Departmentet.FindAsync(request.Department.Department_id);

                _mapper.Map(request.Department, department);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }

    }
}
