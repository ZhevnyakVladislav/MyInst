using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.Models;

namespace Instagram.Test.Unit.BusinessLogic.UserServicesTests
{
    public class TestInfo
    {
        public UserDto NewUser { get; set; }

        public List<Role> Roles { get; set; }

        public Role Role => Roles?.FirstOrDefault();

        public List<User> ExitedUsers { get; set; }

        public bool IsPasswordValid { get; set; }

        public UserDto GetExitedUser(IMapper mapper)
        {
            return mapper.Map<UserDto>(ExitedUsers.FirstOrDefault());
        }
    }
}