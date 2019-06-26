using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Instagram.BusinessLogic;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.BusinessLogic.Services;
using Instagram.Common.Enums;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;
using Instagram.Test.Unit.BusinessLogic.Common.Generators;
using Instagram.Test.Unit.BusinessLogic.UserServicesTests.Mocks;
using Instagram.Test.Unit.BusinessLogic.UserServicesTests.Generator;
using Microsoft.AspNet.Identity;
using NSubstitute;
using NUnit.Framework;

namespace Instagram.Test.Unit.BusinessLogic.UserServicesTests
{
    public class UserServiceTests
    {
        private IProfileService _profileService;

        private UserManager<User, int> _userManager;

        private RoleManager<Role, int> _roleManager;

        private IMapper _mapper;

        private IUserService _testObject;

        public UserServiceTests()
        {
            AutoMapperConfig.RegisterMapper();
        }

        private void InitTestObject()
        {
            _profileService = ProfileServiceMoqs.GetStandart();
            _userManager = UserManagerMoqs.GetStandart();
            _roleManager = RoleManagerMoqs.GetStandart();
            _mapper = IoContainer.Resolve<IMapper>();
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);
        }

        [SetUp]
        public void InitTest()
        {
            InitTestObject();
        }

        private TestInfo GetDefaultTestInfo()
        {
            return new TestInfo
            {
                ExitedUsers = UserGenerator.GetFakeUsers(2),
                NewUser = DtoUserGenerator.GetUserWithRole(Roles.Admin),
                Roles = RoleGenerator.GetFakeRole(1),
                IsPasswordValid = true,
                IsEmailConfirmed = true
            };
        }

        //[Category("CreateUserAsyncTest")]
        //[Test]
        //public void CreateUserAsyncTest()
        //{
        //    TestInfo testInfo = GetDefaultTestInfo();
        //    _profileService = ProfileServiceMoqs.GetImplemented();
        //    _roleManager = RoleManagerMoqs.GetImplemented(testInfo);
        //    _userManager = UserManagerMoqs.GetImplemented(testInfo);
        //    _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);

        //    Assert.DoesNotThrowAsync(() => _testObject.CreateUserAsync(testInfo.NewUser));

        //    _userManager.Received().FindByNameAsync(Arg.Any<string>());
        //    _roleManager.Received().FindByNameAsync(Arg.Any<string>());
        //    _userManager.Received().CreateAsync(Arg.Any<User>());
        //    _profileService.Received().CreateProfile(Arg.Any<ProfileDto>());

        //}

        [Category("CreateUserAsyncTest")]
        [Test]
        public void CreateUserAsync_ArgumentNullExceptionTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(() => _testObject.CreateUserAsync(null));

            _userManager.DidNotReceive().FindByNameAsync(Arg.Any<string>());
            _roleManager.DidNotReceive().FindByNameAsync(Arg.Any<string>());
            _userManager.DidNotReceive().CreateAsync(Arg.Any<User>());
            _profileService.DidNotReceive().CreateProfile(Arg.Any<ProfileDto>());
        }

        [Category("CreateUserAsyncTest")]
        [Test]
        public void CreateUserAsync_UserExistsBusinesslogicExceptionTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);

            Assert.ThrowsAsync<BusinesslogicException>(() => _testObject.CreateUserAsync(testInfo.GetExitedUser(_mapper)));

            _userManager.Received().FindByNameAsync(Arg.Any<string>());
            _roleManager.DidNotReceive().FindByNameAsync(Arg.Any<string>());
            _userManager.DidNotReceive().CreateAsync(Arg.Any<User>());
            _profileService.DidNotReceive().CreateProfile(Arg.Any<ProfileDto>());
        }

        [Category("CreateUserAsyncTest")]
        [Test]
        public void CreateUserAsync_RoleNotFoundBusinesslogicExceptionTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _roleManager = RoleManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);
            testInfo.NewUser.Role = (Roles)int.MinValue;

            Assert.ThrowsAsync<BusinesslogicException>(() => _testObject.CreateUserAsync(testInfo.NewUser));

            _userManager.Received().FindByNameAsync(Arg.Any<string>());
            _roleManager.Received().FindByNameAsync(Arg.Any<string>());
            _userManager.DidNotReceive().CreateAsync(Arg.Any<User>());
            _profileService.DidNotReceiveWithAnyArgs().CreateProfile(Arg.Any<ProfileDto>());
        }

        [Category("AuthenticateUserAsync")]
        [Test]
        public void AuthenticateUserTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);

            Assert.DoesNotThrowAsync(() => _testObject.AuthenticateUserAsync(testInfo.GetExitedUser(_mapper)));

            _userManager.Received().FindByNameAsync(Arg.Any<string>());
            _userManager.Received().IsEmailConfirmedAsync(Arg.Any<int>());
            _userManager.Received().CheckPasswordAsync(Arg.Any<User>(), Arg.Any<string>());
            _userManager.Received().CreateIdentityAsync(Arg.Any<User>(), Arg.Any<string>());
        }

        [Category("AuthenticateUserAsync")]
        [Test]
        public void AuthenticateUser_ArgumentNullExceptionTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(() => _testObject.AuthenticateUserAsync(null));

            _userManager.DidNotReceive().FindByNameAsync(Arg.Any<string>());
            _userManager.DidNotReceive().IsEmailConfirmedAsync(Arg.Any<int>());
            _userManager.DidNotReceive().CheckPasswordAsync(Arg.Any<User>(), Arg.Any<string>());
            _userManager.DidNotReceive().CreateIdentityAsync(Arg.Any<User>(), Arg.Any<string>());
        }

        [Category("AuthenticateUserAsync")]
        [Test]
        public void AuthenticateUser_NotFoundUserBusinessLogicExceptionTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);

            Assert.ThrowsAsync<BusinesslogicException>(() => _testObject.AuthenticateUserAsync(testInfo.NewUser));

            _userManager.Received().FindByNameAsync(Arg.Any<string>());
            _userManager.DidNotReceive().IsEmailConfirmedAsync(Arg.Any<int>());
            _userManager.DidNotReceive().CheckPasswordAsync(Arg.Any<User>(), Arg.Any<string>());
            _userManager.DidNotReceive().CreateIdentityAsync(Arg.Any<User>(), Arg.Any<string>());
        }

        [Category("AuthenticateUserAsync")]
        [Test]
        public void AuthenticateUser_EmailNotCorfimedBusinessLogicExceptionTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);
            testInfo.IsEmailConfirmed = false;

            Assert.ThrowsAsync<BusinesslogicException>(() => _testObject.AuthenticateUserAsync(testInfo.GetExitedUser(_mapper)));

            _userManager.Received().FindByNameAsync(Arg.Any<string>());
            _userManager.Received().IsEmailConfirmedAsync(Arg.Any<int>());
            _userManager.DidNotReceive().CheckPasswordAsync(Arg.Any<User>(), Arg.Any<string>());
            _userManager.DidNotReceive().CreateIdentityAsync(Arg.Any<User>(), Arg.Any<string>());
        }

        [Category("AuthenticateUserAsync")]
        [Test]
        public void AuthenticateUser_WrongPasswordBusinessLogicExceptionTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);
            testInfo.IsPasswordValid = false;

            Assert.ThrowsAsync<BusinesslogicException>(() => _testObject.AuthenticateUserAsync(testInfo.GetExitedUser(_mapper)));

            _userManager.Received().FindByNameAsync(Arg.Any<string>());
            _userManager.Received().IsEmailConfirmedAsync(Arg.Any<int>());
            _userManager.Received().CheckPasswordAsync(Arg.Any<User>(), Arg.Any<string>());
            _userManager.DidNotReceive().CreateIdentityAsync(Arg.Any<User>(), Arg.Any<string>());
        }

        [Category("GetUserByEmail")]
        [Test]
        public void GetUserByEmailTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);
            var email = testInfo.GetExitedUser(_mapper).Email;

            UserDto user = null;

            Assert.DoesNotThrow(() =>
            {
                user = _testObject.GetUserByEmail(email);
            });

            Assert.AreEqual(user.Email, email);
            _userManager.Received().FindByEmailAsync(email);
        }

        [Category("GetUserByEmail")]
        [Test]
        [TestCase(null)]
        [TestCase("")]
        public void GetUserByEmail_ArgumentNullExceptionTest(string email)
        {
            Assert.Throws<ArgumentNullException>(() => _testObject.GetUserByEmail(email));

            _userManager.DidNotReceive().FindByEmailAsync(email);
        }

        [Category("GetUserByEmail")]
        [Test]
        public void GetUserByEmail_UserNotFoundBusinessLogicTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);
            var email = testInfo.NewUser.Email;

            Assert.Throws<BusinesslogicException>(() => _testObject.GetUserByEmail(email));
            _userManager.Received().FindByEmailAsync(email);
        }

        [Category("GetUserByUserName")]
        [Test]
        public void GetUserByUserNameTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);
            var userName = testInfo.GetExitedUser(_mapper).UserName;

            UserDto user = null;

            Assert.DoesNotThrow(() =>
            {
                user = _testObject.GetUserByUserName(userName);
            });

            Assert.AreEqual(user.UserName, userName);
            _userManager.Received().FindByNameAsync(userName);
        }

        [Category("GetUserByUserName")]
        [Test]
        [TestCase(null)]
        [TestCase("")]
        public void GetUserByUserName_ArgumentNullExceptionTest(string userName)
        {
            Assert.Throws<ArgumentNullException>(() => _testObject.GetUserByUserName(userName));

            _userManager.DidNotReceive().FindByNameAsync(userName);
        }

        [Category("GetUserByUserName")]
        [Test]
        public void GetUserByUserName_UserNotFoundBusinessLogicTest()
        {
            TestInfo testInfo = GetDefaultTestInfo();
            _userManager = UserManagerMoqs.GetImplemented(testInfo);
            _testObject = new UserService(_userManager, _roleManager, _profileService, _mapper);
            var userName = testInfo.NewUser.UserName;

            Assert.Throws<BusinesslogicException>(() => _testObject.GetUserByUserName(userName));
            _userManager.Received().FindByNameAsync(userName);
        }
    }
}