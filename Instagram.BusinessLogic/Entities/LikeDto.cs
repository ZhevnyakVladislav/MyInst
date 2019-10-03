using System;

namespace Instagram.BusinessLogic.Entities
{
    public class LikeDto
    {
        public int Id { get; set; }

        public UserDto CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
