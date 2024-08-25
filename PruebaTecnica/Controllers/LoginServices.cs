using PruebaTecnica.DAL.Entities;
using PruebaTecnica.DAL;
using PruebaTecnica.DTOs;
using Microsoft.EntityFrameworkCore;

namespace PruebaTecnica.Controllers
{
    public class LoginServices
    {
        private readonly DataBaseContext _context;

        public LoginServices(DataBaseContext context)
        {
            _context = context;
        }

        public async Task<Person?> GetPerson(LoginDTO person)
        {
            return await _context.Persons.
                SingleOrDefaultAsync(x => x.Email == person.Email && x.Password == person.Password);
        }
    }
}
