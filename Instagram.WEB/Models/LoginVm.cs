using System.ComponentModel.DataAnnotations;

namespace Instagram.WEB.Models
{
    public class LoginVm
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}