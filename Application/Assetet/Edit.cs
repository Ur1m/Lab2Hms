using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.Assetet
{
    public class Edit
    {
          public class Command : IRequest<Result<Unit>>
        {
            public Paisjet Paisja { get; set; }
        }

       

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context ;
                _mapper = mapper ;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var paisja = await _context.paisjet.FindAsync(request.Paisja.Paisja_Id);
               // _mapper.Map(request.Paisja, paisja);

               paisja.emertimi=request.Paisja.emertimi ?? paisja.emertimi;
                paisja.pershkrimi=request.Paisja.pershkrimi ?? paisja.pershkrimi;
                paisja.servisimi=request.Paisja.servisimi ?? paisja.servisimi;
                //paisja.Department_Id=request.Paisja.Department_Id ?? paisja.Department_Id;
               
                var result = await _context.SaveChangesAsync() > 0;

               if (!result) return Result<Unit>.Failure("Operacioni deshtoi");

                return Result<Unit>.Success(Unit.Value);
               

                
            }
        }

    }
}