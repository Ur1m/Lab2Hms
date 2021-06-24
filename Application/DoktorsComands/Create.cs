using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Presistence;

namespace Application.DoktorsComands
{
    public class Create
    {
        public class Command : IRequest
        {
       public Guid Mjeku_Id{get;set;}
     
        public string Emri{get;set;}
         
        public string Mbimeri{get;set;}
        
        public DateTime Ditlindja{get;set;}
        
        public string Specializimi{get;set;}
         
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
        }
        
    }*/
     public class CommandValidator : AbstractValidator<Command>
    {
            public CommandValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Mbimeri).NotEmpty();
            RuleFor(X => X.Ditlindja).NotEmpty();
            RuleFor(x => x.Specializimi).NotEmpty();
            RuleFor(x => x.depName).NotEmpty();
        }
        
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
               var Mjeki=new Mjeku{
                   Mjeku_Id=request.Mjeku_Id,
                   Emri=request.Emri,
                   Mbimeri=request.Mbimeri,
                   Ditlindja=request.Ditlindja,
                  Specializimi= request.Specializimi,
                   depName=request.depName

               };
               _context.Mjeket.Add(Mjeki);
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
