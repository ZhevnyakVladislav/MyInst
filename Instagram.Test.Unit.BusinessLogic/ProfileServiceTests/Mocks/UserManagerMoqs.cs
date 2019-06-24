using System.Linq;
using Instagram.Common.Models;
using Microsoft.AspNet.Identity;
using NSubstitute;

namespace Instagram.Test.Unit.BusinessLogic.ProfileServiceTests.Mocks
{
    public class UserManagerMoqs
    {
        public static UserManager<User, int> GetStandart()
        {
            return new UserManager<User, int>(Substitute.For<IUserStore<User, int>>());
        }

        public static UserManager<User, int> GetImplemented(TestInfo testInfo)
        {
            var store = Substitute.For<IUserStore<User, int>>();

            store.FindByNameAsync(Arg.Any<string>()).Returns(x => testInfo.Users.FirstOrDefault(u => u.UserName == (string)x[0]));

            store.CreateAsync(Arg.Any<User>());

            return new UserManager<User, int>(store);
        }
    }
}