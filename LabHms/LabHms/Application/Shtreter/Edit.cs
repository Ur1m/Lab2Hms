using AutoMapper;
using Domain;
using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Shtreter
{
    public class Edit
    {

        public class Command : IRequest
        {
            public Shtrat Shtrat { get; set; }
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
                var shtrat = await _context.Shtreter.FindAsync(request.Shtrat.Shtrat_id);

                _mapper.Map(request.Shtrat, shtrat);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }

    }
}
