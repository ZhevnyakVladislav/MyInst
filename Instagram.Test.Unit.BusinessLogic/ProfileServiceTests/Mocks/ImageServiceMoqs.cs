using Instagram.BusinessLogic.Interfaces;
using NSubstitute;

namespace Instagram.Test.Unit.BusinessLogic.ProfileServiceTests.Mocks
{
    internal class ImageServiceMoqs
    {
        public static IImageService GetStandart()
        {
            return Substitute.For<IImageService>();
        }
    }
}