﻿using System.Collections.Generic;

namespace Instagram.BusinessLogic.Entities
{
    public class ProfileDto
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Website { get; set; }

        public string Bio { get; set; }

        public string PhoneNumber { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<ProfileDto> Followers { get; set; }

        public ICollection<ProfileDto> Following { get; set; }

        public bool IsFollowing { get; set; }

        public bool IsPrivate { get; set; }
    }
}