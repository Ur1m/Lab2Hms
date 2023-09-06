using Domain;
using FluentValidation;
namespace Application.TerminatKontrolles
{
    public class TerminetValidator:AbstractValidator<Terminet>
    {
           public TerminetValidator()
        {
            RuleFor(x => x.Pacient_Id).NotEmpty();
            RuleFor(x => x.Mjeku_Id).NotEmpty();
           RuleFor(x=>x.orari).NotEmpty();
        }
     
    }
}