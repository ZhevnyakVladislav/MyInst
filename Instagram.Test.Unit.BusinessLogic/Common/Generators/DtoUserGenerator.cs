using System.Collections.Generic;
using System.Linq;
using Bogus;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.Enums;
using Instagram.Common.Models;

namespace Instagram.Test.Unit.BusinessLogic.Common.Generators
{
    public class DtoUserGenerator
    {
        private static Faker<UserDto> GetFakeUserSeed()
        {
            return new Faker<UserDto>()
                .StrictMode(false)
                .RuleFor(u => u.Id, f => f.UniqueIndex + 1) //because of UniqueIndex start from 0
                .RuleFor(u => u.UserName, f => f.Name.FirstName())
                .RuleFor(u => u.FullName, f => f.Name.FirstName() + f.Name.LastName())
                .RuleFor(u => u.Password, f => f.Random.Word())
                .RuleFor(u => u.Email, f => f.Person.Email);
        }

        public static UserDto GetFakeUser()
        {
            var fake = GetFakeUserSeed();

            return fake.Generate();
        }

        public static List<UserDto> GetFakeUser(int count)
        {
            var fake = GetFakeUserSeed();

            return fake.Generate(count).ToList();
        }

        public static UserDto GetUserWithRole(Roles role)
        {
            var fake = GetFakeUserSeed().RuleFor(x => x.Role, x => role);

            return fake.Generate();
        }

        public static List<UserDto> GetUserWithRole(Roles role, int count)
        {

            var fake = GetFakeUserSeed().RuleFor(x => x.Role, x => role);

            return fake.Generate(count).ToList();
        }
    }
}