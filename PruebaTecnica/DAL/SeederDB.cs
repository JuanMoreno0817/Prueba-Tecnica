using PruebaTecnica.DAL.Entities;
using PruebaTecnica.Enums;

namespace PruebaTecnica.DAL
{
    public class SeederDB
    {
        private readonly DataBaseContext _context;

        public SeederDB(DataBaseContext context)
        {
            _context = context;
        }
        public async Task SeederAsync()
        {
            await _context.Database.EnsureCreatedAsync();

            await PopulatePersonAsync();
        }

        private async Task PopulatePersonAsync()
        {
            if (!_context.Persons.Any())
            {
                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 12345,
                    Name = "Juan Pablo Moreno",
                    Email = "juan@correo.com",
                    Phone = "3104567986",
                    Password = "12345",
                    userType = 0
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 23456,
                    Name = "Ana María López",
                    Email = "ana@correo.com",
                    Phone = "3209876543",
                    Password = "12345",
                    userType = (UserType)1
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 34567,
                    Name = "Carlos Eduardo García",
                    Email = "carlos@correo.com",
                    Phone = "3112345678",
                    Password = "12345",
                    userType = (UserType)1
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 45678,
                    Name = "Luisa Fernanda Martínez",
                    Email = "luisa@correo.com",
                    Phone = "3187654321",
                    Password = "12345",
                    userType = 0
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 56789,
                    Name = "Ricardo Andrés González",
                    Email = "ricardo@correo.com",
                    Phone = "3123456789",
                    Password = "12345",
                    userType = (UserType)1
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 67890,
                    Name = "María Alejandra Rodríguez",
                    Email = "maria@correo.com",
                    Phone = "3176543210",
                    Password = "12345",
                    userType = (UserType)1
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 78901,
                    Name = "José Fernando Pérez",
                    Email = "jose@correo.com",
                    Phone = "3134567890",
                    Password = "12345",
                    userType = (UserType)1
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 89012,
                    Name = "Sofía Valentina Ramírez",
                    Email = "sofia@correo.com",
                    Phone = "3145678901",
                    Password = "12345",
                    userType = (UserType)1
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 90123,
                    Name = "Miguel Ángel Torres",
                    Email = "miguel@correo.com",
                    Phone = "3198765432",
                    Password = "12345",
                    userType = (UserType)1
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 11234,
                    Name = "Gabriela Isabel Sánchez",
                    Email = "gabriela@correo.com",
                    Phone = "3156789012",
                    Password = "12345",
                    userType = (UserType)1
                });

                _context.Persons.Add(new Person
                {
                    ID = Guid.NewGuid(),
                    Identification = 22345,
                    Name = "Felipe David Ruiz",
                    Email = "felipe@correo.com",
                    Phone = "3167890123",
                    Password = "12345",
                    userType = (UserType)1
                });
            }
        }
    }
}
