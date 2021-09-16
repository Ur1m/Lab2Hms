using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Presistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Laboratoret
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Laboratori Laboratori { get; set; }
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
                var laboratori = await _context.Laboratort.FindAsync(request.Laboratori.Lab_Id);

                if(laboratori == null) return null;

                _mapper.Map(request.Laboratori, laboratori);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Deshtoi ndryshimi i laboratorit");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}