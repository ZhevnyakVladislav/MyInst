using System;

namespace Instagram.WEB.Models
{
    public class LikeVm
    {
        public int Id { get; set; }

        public AuthorVm CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}