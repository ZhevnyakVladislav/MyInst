using System.Collections.Generic;
using System.Linq;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.Models;

namespace Instagram.Test.Unit.BusinessLogic.ProfileServiceTests
{
    public class TestInfo
    {
        public List<User> Users { get; set; }

        public User CurrentUser => Users?.FirstOrDefault();

        public List<UserProfile> Profiles { get; set; }

        public UserProfile CurrentProfile => Profiles?.FirstOrDefault();

    }
}