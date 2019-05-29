using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Instagram.Common.Models
{
    public class UserProfile : BaseModel
    {
        [Key]
        [ForeignKey("User")]
        public int Id { get; set; }

        public string Email { get; set; }

        public string FullName { get; set; }

        public string UserName { get; set; }

        public virtual User User { get; set; }
    }
}