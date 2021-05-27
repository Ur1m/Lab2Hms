using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

using MediatR;
using Presistence;

namespace Application.DoktorsComands
{
    public class Edit
    {
        public class Command:IRequest
        {
          public Guid Mjeku_Id{get;set;}
          [Required]
        public string Emri{get;set;}
        [Required]
        public string Mbimeri{get;set;}
        [Required]
        public DateTime? Ditlindja{get;set;}
        [Required]
        public string Specializimi{get;set;}
        [Required]
        public string depName{get;set;}
    }
   /*  public class ComandValidator : AbstractValidator<Command>
    {
        public ComandValidator(){
          RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Mbimeri).NotEmpty();
            RuleFor(x => x.Ditlindja).NotEmpty();
            RuleFor(x => x.Specializimi).NotEmpty();
            RuleFor(x => x.depName).NotEmpty();
        }*/
        
    
 public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context=context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
              
               var mjeket=await _context.Mjeket.FindAsync(request.Mjeku_Id);
               if(mjeket==null){
                 throw new Exception("Could not finde that news");
               }
               mjeket.Emri=request.Emri ?? mjeket.Emri;
               mjeket.Mbimeri=request.Mbimeri ?? mjeket.Mbimeri;
                mjeket.Ditlindja=request.Ditlindja ?? mjeket.Ditlindja;
               mjeket.Specializimi=request.Specializimi ?? mjeket.Specializimi;
                mjeket.depName=request.depName?? mjeket.depName;
              
            

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