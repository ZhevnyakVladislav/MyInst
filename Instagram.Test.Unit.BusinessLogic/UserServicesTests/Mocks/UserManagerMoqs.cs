using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Instagram.Common.Models;
using Microsoft.AspNet.Identity;
using NSubstitute;

namespace Instagram.Test.Unit.BusinessLogic.UserServicesTests.Mocks
{
    public class UserManagerMoqs
    {
        public static UserManager<User, int> GetStandart()
        {
            return Substitute.For<UserManager<User, int>>(Substitute.For<IUserPasswordStore<User, int>, IUserRoleStore<User, int>, IUserEmailStore<User, int>>());
        }

        public static UserManager<User, int> GetImplemented(TestInfo testInfo)
        {
            var manager = Substitute.For<UserManager<User, int>>(Substitute.For<IUserPasswordStore<User, int>, IUserRoleStore<User, int>, IUserEmailStore<User, int>>());

            manager.FindByNameAsync(Arg.Any<string>()).Returns(x => testInfo.ExitedUsers.FirstOrDefault(u => u.UserName == (string)x[0]));

            manager.CreateAsync(Arg.Any<User>()).Returns(x => new IdentityResult());

            manager.CheckPasswordAsync(Arg.Any<User>(), Arg.Any<string>()).Returns(x => testInfo.IsPasswordValid);

            manager.CreateIdentityAsync(Arg.Any<User>(), Arg.Any<string>()).Returns(x => new ClaimsIdentity());

            manager.FindByEmailAsync(Arg.Any<string>()).Returns(x => testInfo.ExitedUsers.FirstOrDefault(u => u.Email == (string)x[0]));

            manager.IsEmailConfirmedAsync(Arg.Any<int>()).Returns(x => testInfo.IsEmailConfirmed);

            return manager;
        }
    }
}