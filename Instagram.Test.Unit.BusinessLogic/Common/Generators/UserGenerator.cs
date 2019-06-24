using System.Collections.Generic;
using System.Linq;
using Bogus;
using Instagram.Common.Models;

namespace Instagram.Test.Unit.BusinessLogic.Common.Generators
{
    public class UserGenerator
    {
        private static Faker<User> GetFakeUserSeed()
        {
            return new Faker<User>()
                .StrictMode(false)
                .RuleFor(u => u.Id, f => f.UniqueIndex + 1) //because of UniqueIndex start from 0
                .RuleFor(u => u.UserName, f => f.Name.FirstName())
                .RuleFor(u => u.Email, f => f.Person.Email);
        }

        public static List<User> GetFakeUsers(int count)
        {
            var fake = GetFakeUserSeed();

            return fake.Generate(count).ToList();
        }
    }
}