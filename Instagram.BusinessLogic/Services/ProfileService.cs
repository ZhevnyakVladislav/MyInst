using System;
using System.IO;
using System.Linq;
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

        private readonly IImageService _imageService;

        private readonly IMapper _mapper;

        public ProfileService() : this(IoContainer.Resolve<IProfileProvider>(), IoContainer.Resolve<UserManager<User, int>>(), IoContainer.Resolve<ImageService>(), IoContainer.Resolve<IMapper>()) { }

        public ProfileService(IProfileProvider profileProvider, UserManager<User, int> userManager, IImageService imageService, IMapper mapper)
        {
            _profileProvider = profileProvider ?? throw new ArgumentException(nameof(profileProvider));
            _userManager = userManager ?? throw new ArgumentException(nameof(userManager));
            _imageService = imageService ?? throw new ArgumentException(nameof(imageService));
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

            var profile = _profileProvider.GetProfileByUserName(userName);

            if (profile == null) throw new BusinessLogicException($"Profile for user with userName = {userName} was not found.");

            var result = _mapper.Map<ProfileDto>(profile);

            result.Followers = profile.Followers.Select(x => _mapper.Map<ProfileDto>(x)).ToList();
            result.Following = profile.Following.Select(x => _mapper.Map<ProfileDto>(x)).ToList();

            return result;
        }

        public void UpdateProfile(string userName, ProfileDto profile)
        {
            if (userName == null) throw new ArgumentNullException(nameof(userName));
            if (profile == null) throw new ArgumentNullException(nameof(profile));

            var existedProfile = _profileProvider.GetProfileByUserName(userName);

            existedProfile.Website = profile.Website;
            existedProfile.Bio = profile.Bio;
            existedProfile.PhoneNumber = profile.PhoneNumber;
            existedProfile.FullName = profile.FullName;
            
            _profileProvider.Update(existedProfile);
        }

        public string UpdateProfileImage(string userName, Stream filesStream)
        {
            if (filesStream == null) throw new ArgumentNullException(nameof(filesStream));
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

           var imageUrl =  _imageService.Upload(filesStream);

           var userProfile = _profileProvider.GetProfileByUserName(userName);
           userProfile.ImageUrl = imageUrl;

          _profileProvider.Update(userProfile);

          return imageUrl;
        }

        public void UpdateFollowing(string currentUserName, string userName)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

            var existedProfile = _profileProvider.GetProfileByUserName(currentUserName);
            var followingProfile = _profileProvider.GetProfileByUserName(userName);

            if (existedProfile.Following.ToDictionary(x => x.Id, x => x).TryGetValue(followingProfile.Id, out var value))
            {
                existedProfile.Following.Remove(value);
            }
            else
            {
                existedProfile.Following.Add(followingProfile);
            }

            _profileProvider.Update(existedProfile);
        }
    }
}
