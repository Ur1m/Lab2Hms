using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Laboratoret
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        public String Emri { get; set; }
        public String NrId { get; set; }
        public string Mosha { get; set; }
        public string Pershkrimi { get; set; }
        public string Rezultati { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var laboratori= new Laboratori
                {
                    Id = request.Id,
                    Emri=request.Emri,
                    NrId=request.NrId,
                    Mosha=request.Mosha,
                    Pershkrimi=request.Pershkrimi,
                    Rezultati=request.Rezultati,
                    Date=request.Date,
                    City=request.City,
                    
                };
                _context.Laboratoret.Add(laboratori);
                var success = await _context.SaveChangesAsync() >0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }
        }
    }
}