using System.Collections.Generic;
using System.Linq;
using Bogus;
using Instagram.BusinessLogic.Entities;
using Instagram.Common.Models;

namespace Instagram.Test.Unit.BusinessLogic.ProfileServiceTests.Generators
{
    internal class ProfileGenerator
    {
        private static Faker<ProfileDto> GetFakeUserProfile()
        {
            var userProfile = new Faker<ProfileDto>()
                .StrictMode(false)
                .RuleFor(x => x.FullName, f => f.Name.FirstName());

            return userProfile;
        }


        public static List<ProfileDto> GetUserProfiles(int count)
        {
            var fake = GetFakeUserProfile();

            return fake.Generate(count).ToList();
        }
    }
}