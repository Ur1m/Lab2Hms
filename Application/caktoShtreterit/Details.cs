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
    public class Details
    {

        public class Query : IRequest<caktoShtratin>
        {

            public Guid caktoShtratin_id { get; set; }

        }

        public class Handler : IRequestHandler<Query, caktoShtratin>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<caktoShtratin> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.caktoShtreterit.FindAsync(request.caktoShtratin_id);
            }
        }
    }
}