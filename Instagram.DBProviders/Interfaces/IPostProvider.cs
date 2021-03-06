﻿using Instagram.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.DBProviders.Interfaces
{
    public interface IPostProvider
    {
        void CreatePost(Post post);

        Post GetPostById(int id);

        IEnumerable<Post> GetUserPosts(string userName);

        IEnumerable<Post> GetFollowingPost(IEnumerable<string> followersUserName);
    }
}
