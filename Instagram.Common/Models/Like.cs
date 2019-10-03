using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Instagram.Common.Models
{
    public class Like : BaseModel
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public virtual User User { get; set; }

        [ForeignKey("Post")]
        public int PostId { get; set; }

        public Post Post { get; set; }
    }
}
