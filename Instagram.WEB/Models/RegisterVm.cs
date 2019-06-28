using System.ComponentModel.DataAnnotations;

namespace Instagram.WEB.Models
{
    public class RegisterVm
    {
        
        public string Email { get; set; }

        public string FullName { get; set; }

        
        public string UserName { get; set; }

        public string Password { get; set; }

        public string VerificationCode { get; set; }

    }
}