using FluentValidation;
using ReactAPI.Demo.Data.Entities;

namespace ReactAPI.Demo.Validaion
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        public EmployeeValidator() 
        { 
            RuleFor(employee => employee.FirstName).NotNull().NotEmpty().Length(1,250);
            RuleFor(employee => employee.LastName).NotNull().NotEmpty().Length(1, 250);
            RuleFor(employee => employee.Department).NotNull().NotEmpty().Length(1, 250);
            RuleFor(employee => employee.skills).NotNull().NotEmpty().Length(1, 250);
            RuleFor(employee => employee.ImageUrl).NotNull().NotEmpty().Length(1, 4000);
        }
    }
}
