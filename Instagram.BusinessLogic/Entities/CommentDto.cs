using System;

namespace Instagram.BusinessLogic.Entities
{
    public class CommentDto
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public UserDto CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
