using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.BusinessLogic.Entities
{
    public class PostDto
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public UserDto CreatedBy { get; set; }

        public List<LikeDto> LikedBy { get; set; }
        
        public List<CommentDto> Comments { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
