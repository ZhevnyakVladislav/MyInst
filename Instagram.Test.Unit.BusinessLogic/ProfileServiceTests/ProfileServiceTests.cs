using System;
using System.Linq;
using AutoMapper;
using Instagram.BusinessLogic;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.BusinessLogic.Services;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;
using Instagram.Test.Unit.BusinessLogic.Common.Generators;
using Instagram.Test.Unit.BusinessLogic.ProfileServiceTests.Mocks;
using Microsoft.AspNet.Identity;
using NSubstitute;
using NUnit.Framework;

namespace Instagram.Test.Unit.BusinessLogic.ProfileServiceTests
{
    [TestFixture]
    public class ProfileServiceTests
    {
        private  IProfileProvider _profileProvider;

        private  UserManager<User, int> _userManager;

        private  IProfileService _testObject;

        private IImageService _imageService;

        private IMapper _mapper;

        public ProfileServiceTests()
        {
            AutoMapperConfig.RegisterMapper();
        }

        private void InitTestObject()
        {
            _profileProvider = ProfileProviderMoqs.GetStandart();
            _userManager = UserManagerMoqs.GetStandart();
            _imageService = ImageServiceMoqs.GetStandart();
            _mapper = IoContainer.Resolve<IMapper>();
            _testObject = new ProfileService(_profileProvider, _userManager, _imageService, _mapper);
        }

        [SetUp]
        public void InitTest()
        {
            InitTestObject();
        }

        private TestInfo GetDefaultTestInfo()
        {
            var users = UserGenerator.GetFakeUsers(2);
            return new TestInfo
            {
                Users = users,
                Profiles = users.Select(u => new UserProfile {Id = u.Id}).ToList()
            };
        }

        //[Category("GetProfileByUserName")]
        //[Test]
        //public void GetProfileByUserNameTest()
        //{
        //    TestInfo testInfo = GetDefaultTestInfo();
        //    _profileProvider = ProfileProviderMoqs.GetImplemented(testInfo);
        //     _userManager = UserManagerMoqs.GetImplemented(testInfo);
        //    _testObject = new ProfileService(_profileProvider, _userManager, _imageService, _mapper);
        //    var userName = testInfo.CurrentUser.UserName;
        //    var userProfile = _testObject.GetProfileByUserName(userName);

        //    Assert.AreEqual(userName, userProfile.UserName);
        //    _profileProvider.Received().GetProfileByUserId(Arg.Any<int>());
        //}

        [Category("GetProfileByUserName")]
        [Test]
        [TestCase(null)]
        [TestCase("")]
        public void GetProfileByUserName_ArgumentNullException(string userName)
        {
            var exc = Assert.Throws<ArgumentNullException>(() => _testObject.GetProfileByUserName(userName));

            Assert.AreEqual("userName", exc.ParamName);
            _profileProvider.DidNotReceiveWithAnyArgs().GetProfileByUserId(Arg.Any<int>());
        }

        //[Category("GetProfileByUserName")]
        //[Test]
        //public void GetProfileByUserName_BusinessLogicExceptionTest()
        //{
        //    TestInfo testInfo = GetDefaultTestInfo();
        //    testInfo.Profiles.ForEach(p =>  p.Id = new Random().Next());
        //    _profileProvider = ProfileProviderMoqs.GetImplemented(testInfo);
        //    _userManager = UserManagerMoqs.GetImplemented(testInfo);
        //    _testObject = new ProfileService(_profileProvider, _userManager, _imageService, _mapper);

        //    var userName = testInfo.CurrentUser.UserName;

        //    Assert.Throws<BusinessLogicException>(() => _testObject.GetProfileByUserName(userName));

        //    _profileProvider.Received().GetProfileByUserId(Arg.Any<int>());
        //}

        [Category("CreateProfile")]
        [Test]
        public void CreateProfileTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            IProfileProvider profileProviderCustom = ProfileProviderMoqs.GetImplemented(testInfo);
            IProfileService testObject = new ProfileService(profileProviderCustom, _userManager, _imageService, _mapper);

            var profile = new ProfileDto()
            {
                Id = 1,
                UserName = Guid.NewGuid().ToString(),
                FullName = Guid.NewGuid().ToString()
            };

            Assert.DoesNotThrow(() => testObject.CreateProfile(profile));

            profileProviderCustom.Received().Create(Arg.Any<UserProfile>());
        }

        [Category("CreateProfile")]
        [Test]
        [TestCase(null)]
        public void CreateProfileTest_ArgumentNullException(ProfileDto profile)
        {
            var exc = Assert.Throws<ArgumentNullException>(() => _testObject.CreateProfile(profile));

            Assert.AreEqual("profile", exc.ParamName);
            _profileProvider.DidNotReceiveWithAnyArgs().Create(Arg.Any<UserProfile>());
        }
    }
}