using Instagram.Common.Enums;

namespace Instagram.BusinessLogic.Entities
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public Roles Role { get; set; }
    }
}