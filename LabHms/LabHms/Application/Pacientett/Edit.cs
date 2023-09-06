using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Presistence;

namespace Application.Pacientett
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var pacineti = await _context.pacientet.FindAsync(request.Pacienti.Pacient_Id);

                pacineti.emri=request.Pacienti.emri ?? pacineti.emri;
                pacineti.mbimeri=request.Pacienti.mbimeri ?? pacineti.mbimeri;
                pacineti.adresa=request.Pacienti.adresa ?? pacineti.adresa;
                pacineti.qyteti=request.Pacienti.qyteti ?? pacineti.qyteti;
                pacineti.ditlindja=request.Pacienti.ditlindja ?? pacineti.ditlindja;
                pacineti.grupigjakut=request.Pacienti.grupigjakut ?? pacineti.grupigjakut;

                //if(pacineti == null) return null;

                //_mapper.Map(request.Pacienti, pacineti);

                var result = await _context.SaveChangesAsync() > 0;

               if (!result) return Result<Unit>.Failure("Operacioni deshtoi");

                return Result<Unit>.Success(Unit.Value);
               

                
            }
        }

    }
        
    }
