using System.Linq;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;
using NSubstitute;

namespace Instagram.Test.Unit.BusinessLogic.ProfileServiceTests.Mocks
{
    internal class ProfileProviderMoqs
    {
        public static IProfileProvider GetStandart()
        {
            return Substitute.For<IProfileProvider>();
        }

        public static IProfileProvider GetImplemented(TestInfo testInfo)
        {
            IProfileProvider provider = Substitute.For<IProfileProvider>();

            provider.Create(Arg.Any<UserProfile>());

            provider.GetProfileByUserId(Arg.Any<int>()).Returns(x => testInfo.Profiles.FirstOrDefault(i => i.Id == (int) x[0]));

            return provider;
        }
    }
}