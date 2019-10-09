using System;

namespace Instagram.WEB.Models
{
    public class CommentVm
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public AuthorVm CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}