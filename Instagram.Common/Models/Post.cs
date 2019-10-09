
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Instagram.Common.Models
{
    public class Post : BaseModel
    {
        [Key]
        public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public virtual User CreatedBy { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Like> Likes { get; set; }

    }
}
