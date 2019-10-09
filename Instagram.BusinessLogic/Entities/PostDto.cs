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

        public string Url { get; set; }

        public string Description { get; set; }

        public AuthorDto CreatedBy { get; set; }

        public List<LikeDto> Likes { get; set; }

        public List<CommentDto> Comments { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
