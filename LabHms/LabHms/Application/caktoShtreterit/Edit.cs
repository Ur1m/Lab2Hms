using AutoMapper;
using Domain;
using MediatR;
using Presistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.caktoShtreterit
{
    public class Edit
    {

        public class Command : IRequest
        {
            public caktoShtratin caktoShtratin { get; set; }
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
                var caktoShtratin = await _context.caktoShtreterit.FindAsync(request.caktoShtratin.caktoShtratin_id);

                _mapper.Map(request.caktoShtratin, caktoShtratin);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }

    }
}
