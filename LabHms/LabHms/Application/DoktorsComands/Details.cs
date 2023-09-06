using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.DoktorsComands
{
    public class Details
    {
        public class Query : IRequest<Mjeku> {
         

            public Guid Id{get; set;}
        }

        public class Handler : IRequestHandler<Query, Mjeku>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context=context;
            }

           

            public async Task<Mjeku> Handle(Query request, CancellationToken cancellationToken)
            {
               var mjeku= await  _context.Mjeket.FindAsync(request.Id);
                 return mjeku;
            }


            /*  public async Task<Lajmet> Handle(Query request, CancellationToken cancellationToken)
              {
                 return ActivitySpanId= await  _context.lajmet.FindAsync(request.Id);
                // return activity;
              }*/
        }

    }
}