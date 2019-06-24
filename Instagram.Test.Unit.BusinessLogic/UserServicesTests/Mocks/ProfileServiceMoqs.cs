using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using NSubstitute;

namespace Instagram.Test.Unit.BusinessLogic.UserServicesTests.Mocks
{
    public class ProfileServiceMoqs
    {
        public static IProfileService GetStandart()
        {
            return Substitute.For<IProfileService>();
        }

        public static IProfileService GetImplemented()
        {
            var service = Substitute.For<IProfileService>();

            service.CreateProfile(Arg.Any<ProfileDto>());

            return service;
        }
    }
}