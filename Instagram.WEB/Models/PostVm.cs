using System;
using System.Collections.Generic;

namespace Instagram.WEB.Models
{
    public class PostVm
    {
        public int Id { get; set; }


        public string Url { get; set; }

        public string Description { get; set; }

        public AuthorVm CreatedBy { get; set; }

        public List<LikeVm> Likes { get; set; }
        public int LikesCount { get; set; }

        public List<CommentVm> Comments { get; set; }

        public int CommentsCount { get; set; }

        public DateTime CreatedAt { get; set; }



    }
}