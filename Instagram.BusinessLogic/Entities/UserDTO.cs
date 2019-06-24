using Instagram.Common.Enums;
using Instagram.Common.Models;

namespace Instagram.BusinessLogic.Entities
{
    public class UserDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; }

        public Roles Role { get; set; }

    }
}