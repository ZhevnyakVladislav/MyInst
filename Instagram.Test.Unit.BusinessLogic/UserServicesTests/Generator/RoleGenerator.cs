using System.Collections.Generic;
using System.Linq;
using Bogus;
using Instagram.Common.Enums;
using Instagram.Common.Models;
using NUnit.Framework;

namespace Instagram.Test.Unit.BusinessLogic.UserServicesTests.Generator
{
    public class RoleGenerator
    {
        private static Faker<Role> GetRoleSeed()
        {
            return new Faker<Role>()
                .StrictMode(false)
                .RuleFor(x => x.Id, x => x.UniqueIndex)
                .RuleFor(x => x.Name, x => Roles.Admin.ToString());
        }

        public static List<Role> GetFakeRole(int count)
        {
            var fake = GetRoleSeed();

            return fake.Generate(count).ToList();
        }
    }
}