using AutoMapper;
using Domain;
using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Dhomat
{
    public class Edit
    {

        public class Command : IRequest
        {
            public Dhoma Dhoma { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var Dhoma = await _context.Dhomat.FindAsync(request.Dhoma.Dhoma_Id);

                _mapper.Map(request.Dhoma, Dhoma);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }

    }
}
