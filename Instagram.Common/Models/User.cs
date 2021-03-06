﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNet.Identity;

namespace Instagram.Common.Models
{
    public class User : BaseModel, IUser<int>
    {
        [Key]
        public int Id { get; set; }

        public bool EmailConfirmed { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        public string PasswordHash { get; set; }

        public string SecurityStamp { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }

        public ICollection<Post> Posts { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public virtual UserProfile UsertProfile { get; set; }
    }
}