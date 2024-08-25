using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica.DAL;
using PruebaTecnica.DAL.Entities;
using PruebaTecnica.DTOs;
using System.Linq;

namespace PruebaTecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public PersonController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet, ActionName("Get")]
        [Route("GetPersons")]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
        {
            var Persons = await _context.Persons.ToListAsync();
            if (Persons == null) return NotFound();
            return Persons;
        }

        [HttpGet, ActionName("Get")]
        [Route("GetPerson/{id}")]
        public async Task<ActionResult<Person>> GetPersonByIdentification(int id)
        {
            var Person = await _context.Persons.FirstOrDefaultAsync(a => a.Identification == id);

            if (Person == null) return NotFound("Person not found");

            return Person;
        }

        [HttpGet, ActionName("Get")]
        [Route("GetPersonByFilter/{id}")]
        public async Task<ActionResult<Person>> GetPersonByFilter([FromBody] SearchDTO filter)
        {
            var query = _context.Persons.AsQueryable();

            if (!String.IsNullOrEmpty(filter.Nombre))
            {
                query = query.Where(p => p.Name == filter.Nombre);
            }

            if (filter.Identification.HasValue)
            {
                query = query.Where(p => p.Identification == filter.Identification);
            }

            var persons = await query.ToListAsync();

            if (!persons.Any())
            {
                return null;
            }

            return Ok(persons);
        }

        [HttpPost, ActionName("Create")]
        [Route("CreatePerson")]
        public async Task<ActionResult<Person>> CreatePerson(Person Person)
        {
            try
            {
                _context.Persons.Add(Person);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException.Message.Contains("duplicate"))
                    return Conflict(String.Format("{0} ya existe", Person.Identification));
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }

            return Ok(Person);
        }

        [HttpPut, ActionName("Edit")]
        [Route("EditPerson/{id}")]
        public async Task<IActionResult> EditPerson(int id, Person Person)
        {
            try
            {
                if (id != Person.Identification) return NotFound("Person not found");

                _context.Persons.Update(Person);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException.Message.Contains("duplicate"))
                    return Conflict(String.Format("{0} ya existe", Person.Identification));
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }

            return Ok(Person);
        }

        [HttpDelete, ActionName("Delete")]
        [Route("DeletePerson/{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            var Person = await _context.Persons.FirstOrDefaultAsync(a => a.Identification == id);

            if (Person == null) return NotFound("Person not found");

            _context.Persons.Remove(Person);
            await _context.SaveChangesAsync();

            return Ok(String.Format("La persona {0} fue eliminada con éxito!", Person.Name));
        }
    }
}