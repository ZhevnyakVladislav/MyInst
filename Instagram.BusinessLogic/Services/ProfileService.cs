using System;
using System.Threading.Tasks;
using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.Extensions;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;
using Microsoft.AspNet.Identity;

namespace Instagram.BusinessLogic.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileProvider _profileProvider;

        private readonly UserManager<User, int> _userManager;

        private readonly IMapper _mapper;

        public ProfileService() : this(IoContainer.Resolve<IProfileProvider>(), IoContainer.Resolve<UserManager<User, int>>(), IoContainer.Resolve<IMapper>()) { }

        public ProfileService(IProfileProvider profileProvider, UserManager<User, int> userManager, IMapper mapper)
        {
            _profileProvider = profileProvider ?? throw new ArgumentException(nameof(profileProvider));
            _userManager = userManager ?? throw new ArgumentException(nameof(userManager));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        public void CreateProfile(ProfileDto profile)
        {
            if (profile == null) throw new ArgumentNullException(nameof(profile));

            var userProfile = _mapper.Map<UserProfile>(profile);

            _profileProvider.Create(userProfile);
        }

        public ProfileDto GetProfileByUserName(string userName)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

            var user = _userManager.FindByNameAsync(userName).Result;
            var profile = _profileProvider.GetProfileByUserId(user.Id);

            if (profile == null)
            {
                throw new BusinesslogicException($"Profile for user with id = {user.Id} was not found.");
            }

            var result = _mapper.Map<ProfileDto>(profile);
            result.UserName = user.UserName;

            return result;
        }

        public void UpdateProfile(ProfileDto profile)
        {
            if (profile == null) throw new ArgumentNullException(nameof(profile));

            var userProfile = _mapper.Map<UserProfile>(profile);

            _profileProvider.Update(userProfile);
        }

        public string UpdateProfileImage(string userName, byte[] file)
        {
            throw new NotImplementedException();
        }
    }
}
