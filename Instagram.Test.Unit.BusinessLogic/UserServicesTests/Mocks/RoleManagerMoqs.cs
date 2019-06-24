using System.Linq;
using Instagram.Common.Models;
using Microsoft.AspNet.Identity;
using NSubstitute;

namespace Instagram.Test.Unit.BusinessLogic.UserServicesTests.Mocks
{
    public class RoleManagerMoqs
    {
        public static RoleManager<Role, int> GetStandart()
        {
            return Substitute.For<RoleManager<Role, int>>(Substitute.For<IRoleStore<Role, int>>());
        }

        public static RoleManager<Role, int> GetImplemented(TestInfo testInfo)
        {
            var manager = Substitute.For<RoleManager<Role, int>>(Substitute.For<IRoleStore<Role, int>>());

            manager.FindByNameAsync(Arg.Any<string>()).Returns(x => testInfo.Roles.FirstOrDefault(r => r.Name == (string) x[0]));

            return manager;
        }
    }
}