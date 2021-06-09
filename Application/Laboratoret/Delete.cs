using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Laboratoret
{
    public class Delete
    {
        public class Command : IRequest
                {
                   public Guid Id { get; set; }
                }
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        this._context = context;
                    }
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        var laboratori=await _context.Laboratoret.FindAsync(request.Id);

                        if(laboratori == null)
                            throw new Exception ("Could not find Laborators");

                        _context.Remove(laboratori);    

                        var success = await _context.SaveChangesAsync() >0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
        
                    }
                }
    }
}