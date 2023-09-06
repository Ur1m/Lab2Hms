using Domain;
using FluentValidation;
namespace Application.Pacientett
{
    public class PacinetatValidator:AbstractValidator<Pacient>
    {
         public PacinetatValidator()
        {
            RuleFor(x => x.emri).NotEmpty();
            RuleFor(x => x.mbimeri).NotEmpty();
            RuleFor(x => x.adresa).NotEmpty();
            RuleFor(X => X.ditlindja).NotEmpty();
             RuleFor(x=>x.grupigjakut).NotEmpty();
        }
        
    }
}