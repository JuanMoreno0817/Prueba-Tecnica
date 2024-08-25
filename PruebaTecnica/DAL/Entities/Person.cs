using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaTecnica.DAL.Entities
{
    public class Person
    {
        public Guid ID { get; set; }

        [Display(Name = "Documento")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Identification { get; set; }
        [Display(Name = "Nombre")]
        public string Name { get; set; }
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Display(Name = "Telefono")]
        public string Phone { get; set; }
    }
}
