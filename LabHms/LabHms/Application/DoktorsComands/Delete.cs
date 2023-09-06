using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.DoktorsComands
{
    public class Delete
    {
          public class Command : IRequest
        {
        public Guid Id{get; set;}
        }
 public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context=context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
               var mjeki=await _context.Mjeket.FindAsync(request.Id);
               if(mjeki==null){
                   throw new Exception("Could not finde any news");
               }
               _context.Remove(mjeki);

               var success=await _context.SaveChangesAsync()>0;
               if(success){
                   return Unit.Value;
               }
               else{
                   throw new Exception("Problem saving changes");
               }
            }
        }
    }
}