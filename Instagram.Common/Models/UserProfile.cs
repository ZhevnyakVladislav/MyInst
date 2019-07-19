using System.Collections.Generic;
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

        public string ImageUrl { get; set; }

        public bool IsPrivate { get; set; }


        public virtual User User { get; set; }

        public virtual  ICollection<UserProfile> Following { get; set; }

        public virtual ICollection<UserProfile> Followers { get; set; }

        public UserProfile()
        {
            Followers = new HashSet<UserProfile>();
            Following = new HashSet<UserProfile>();
        }
    }
}