using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.TerminatKontrolles
{
    public class Edit
    {
          public class Command : IRequest<Result<Unit>>
        {
            public Terminet terminet { get; set; }
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
                var termini = await _context.Terminet.FindAsync(request.terminet.termini_ID);

              /*termini.Pacient_Id=request.terminet.Pacient_Id ?? termini.Pacient_Id;
               termini.Mjeku_Id=request.terminet.Mjeku_Id ?? termini.Mjeku_Id;*/
               termini.orari=request.terminet.orari ?? termini.orari;

                

                var result = await _context.SaveChangesAsync() > 0;

               if (!result) return Result<Unit>.Failure("Operacioni deshtoi");

                return Result<Unit>.Success(Unit.Value);
               

                
            }
        }
    }
}