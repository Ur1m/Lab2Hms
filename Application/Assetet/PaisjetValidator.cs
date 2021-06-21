using Domain;
using FluentValidation;

namespace Application.Assetet
{
    public class PaisjetValidator : AbstractValidator<Paisjet>
    {
        public PaisjetValidator()
        {
            RuleFor(x => x.emertimi).NotEmpty();
            RuleFor(x => x.pershkrimi).NotEmpty();
            RuleFor(X => X.servisimi).NotEmpty();
            RuleFor(x => x.Department_Id).NotEmpty();
        }
    }

}