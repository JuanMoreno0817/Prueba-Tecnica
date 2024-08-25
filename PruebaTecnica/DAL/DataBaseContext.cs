using Microsoft.EntityFrameworkCore;
using PruebaTecnica.DAL.Entities;

namespace PruebaTecnica.DAL
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        public DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().HasIndex(p => p.ID).IsUnique();
            modelBuilder.Entity<Person>().ToTable("Person");
        }
    }
}
