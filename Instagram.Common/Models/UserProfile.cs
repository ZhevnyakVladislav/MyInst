using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Instagram.Common.Models
{
    public class UserProfile : BaseModel
    {
        [ForeignKey("User")]
        public int Id { get; set; }

        public string FullName { get; set; }

        public string Website { get; set; }

        public string Bio { get; set; }

        public string PhoneNumber { get; set; }

        public string Gernder { get; set; }

        public string Photo { get; set; }

        public virtual User User { get; set; }
    }
}