using CsvHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica.DAL;
using PruebaTecnica.DAL.Entities;
using PruebaTecnica.DTOs;
using System.Formats.Asn1;
using System.Globalization;
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

        [Authorize]
        [HttpGet, ActionName("Get")]
        [Route("GetPersons")]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
        {
            var Persons = await _context.Persons.ToListAsync();
            if (Persons == null) return NotFound();
            return Persons;
        }

        [Authorize]
        [HttpPost]
        [Route("GetPerson")]
        public async Task<ActionResult<Person>> GetPersonByIdentification([FromBody] SearchDTO filter)
        {
            var person = await _context.Persons.Where(p => p.Identification.ToString().Contains(filter.Identification.ToString())).ToListAsync();

            if (person == null) return NotFound("Person not found");

            return Ok(person);
        }

        [Authorize]
        [HttpPost]
        [Route("GetPersonByFilter")]
        public async Task<ActionResult<Person>> GetPersonByName([FromBody] SearchDTO? filter)
        {

            var persons = await _context.Persons.Where(p => p.Name.Contains(filter.Nombre)).ToListAsync();

            if (!persons.Any())
            {
                return null;
            }

            return Ok(persons);
        }

        [HttpPost, ActionName("Create")]
        [Route("CreatePerson")]
        public async Task<ActionResult<Person>> CreatePerson(Person person)
        {
            try
            {
                person.ID = new Guid();
                _context.Persons.Add(person);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException.Message.Contains("duplicate"))
                    return Conflict(String.Format("{0} ya existe",person.Identification));
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }

            return Ok(person);
        }

        [Authorize]
        [HttpPut, ActionName("Edit")]
        [Route("EditPerson")]
        public async Task<IActionResult> EditPerson(Person person)
        {
            try
            {
                _context.Persons.Update(person);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException.Message.Contains("duplicate"))
                    return Conflict(String.Format("{0} ya existe", person.Identification));
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }

            return Ok(person);
        }

        [Authorize(Policy = "Admin")]
        [HttpDelete, ActionName("Delete")]
        [Route("DeletePerson/{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            var person = await _context.Persons.FirstOrDefaultAsync(a => a.Identification == id);

            if (person == null) return NotFound("Person not found");

            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();

            return Ok(String.Format("La persona {0} fue eliminada con éxito!", person.Name));
        }

        [Authorize]
        [HttpPost, ActionName("CreatePersons")]
        [Route("CreatePersons")]
        public async Task<IActionResult> UploadCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            using (var stream = new StreamReader(file.OpenReadStream()))
            {
                var csvReader = new CsvReader(stream, new CsvHelper.Configuration.CsvConfiguration(CultureInfo.InvariantCulture));
                var records = csvReader.GetRecords<Person>().ToList();
                foreach (Person x in records) { 
                    x.ID = Guid.NewGuid();
                }
                _context.Persons.AddRange(records);
                await _context.SaveChangesAsync();
            }

            return Ok("Archivo subido correctamente");
        }
    }
}