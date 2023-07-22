using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAPI.Demo.Data;
using ReactAPI.Demo.Data.Entities;

namespace ReactAPI.Demo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ReactJSDemoYTContext _reactContext;

        public EmployeeController(ReactJSDemoYTContext reactContext)
        {
            _reactContext = reactContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _reactContext.Employee.ToListAsync();
            if(!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ModelState);
            }
            return Ok(employees);
        }

        [HttpPost]

        public async Task<IActionResult> Post(Employee newEmployee)
        {
            _reactContext.Employee.Add(newEmployee);
            await _reactContext.SaveChangesAsync();
            return Ok(newEmployee);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var employeeById = await _reactContext.Employee.FindAsync(id);
            return Ok(employeeById);
        }

        [HttpPut]
        
        public async Task<IActionResult> Put(Employee employeeToUpdate)
        {
            _reactContext.Employee.Update(employeeToUpdate);
            await _reactContext.SaveChangesAsync();
            return Ok(employeeToUpdate);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employeeToDelete = await _reactContext.Employee.FindAsync(id);
            if (employeeToDelete == null)
            {
                return NotFound();
            }

            _reactContext.Employee.Remove(employeeToDelete);
            await _reactContext.SaveChangesAsync();
            return Ok();

        }
    }
}
