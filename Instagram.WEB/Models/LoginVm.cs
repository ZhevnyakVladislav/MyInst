﻿using System.ComponentModel.DataAnnotations;

namespace Instagram.WEB.Models
{
    public class LoginVm
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}