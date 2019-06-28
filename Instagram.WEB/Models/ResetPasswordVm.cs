namespace Instagram.WEB.Models
{
    public class ResetPasswordVm
    {
        public string UserName { get; set; }

        public string Token { get; set; }

        public string NewPassword { get; set; }
    }
}