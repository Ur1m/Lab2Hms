using Domain;
using FluentValidation;

namespace Application.Departmentet
{
    public class DepartmentValidator : AbstractValidator<Department>
    {
        public DepartmentValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}