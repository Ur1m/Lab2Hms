using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Laboratoret
{
    public class Edit
    {
        public class Command : IRequest
                {
            public Guid Id { get; set; }
            public String Emri { get; set; }
            public String NrId { get; set; }
            public string Mosha { get; set; }
            public string Pershkrimi { get; set; }
            public string Rezultati { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
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
                        var laboratori= await _context.Laboratoret.FindAsync(request.Id);

                        if(laboratori==null)
                            throw new Exception ("Could not find laboratori");

                        laboratori.Emri=request.Emri ?? laboratori.Emri;
                        laboratori.NrId=request.NrId ?? laboratori.NrId;
                        laboratori.Mosha=request.Mosha ?? laboratori.Mosha;
                        laboratori.Pershkrimi=request.Pershkrimi ?? laboratori.Pershkrimi;
                        laboratori.Rezultati=request.Rezultati ?? laboratori.Rezultati;
                        laboratori.Date=request.Date ?? laboratori.Date;
                        laboratori.City=request.City ?? laboratori.City;
                        


                        var success = await _context.SaveChangesAsync() >0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
        
                    }
                }
    }
}