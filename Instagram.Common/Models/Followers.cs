using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Instagram.Common.Models
{
    public class Followers
    {
        [Key, Column(Order = 0)]
        [ForeignKey("Owner")]
        public int OwnerId { get; set; }

        [Key, Column(Order = 1)]
        [ForeignKey("Follower")]
        public int FollowerId { get; set; }

        public virtual User Owner { get; set; }

        public virtual User Follower { get; set; }
    }
}