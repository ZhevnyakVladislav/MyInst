using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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

            var following = _profileProvider.GetFollowingByUserName(userName);

            var result = _mapper.Map<ProfileDto>(profile);

            result.Followers = profile.Followers.Select(x => _mapper.Map<ProfileDto>(x)).ToList();
            result.Following = following.Select(x => _mapper.Map<ProfileDto>(x)).ToList();

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

            var imageUrl = _imageService.Upload(filesStream);

            var userProfile = _profileProvider.GetProfileByUserName(userName);
            userProfile.ImageUrl = imageUrl;

            _profileProvider.Update(userProfile);

            return imageUrl;
        }

        public void Follow(string userName, string followerUserName)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

            var followers = GetFollowers(userName);

            if (followers.Select(p => p.UserName).Contains(followerUserName)) throw new BusinessLogicException("User is already follow");

            _profileProvider.Follow(userName, followerUserName);
        }

        public void Unfollow(string userName, string followerUserName)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

            var followers = GetFollowers(userName);

            if (!followers.Select(p => p.UserName).Contains(followerUserName)) throw new BusinessLogicException("User is already unfollow");

            _profileProvider.Unfollow(userName, followerUserName);
        }

        public IEnumerable<ProfileDto> GetFollowers(string userName)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

            var followers = _profileProvider.GetFollowersByUserName(userName);

            return followers.Select(x =>
            {
                var result = _mapper.Map<ProfileDto>(x);
                result.Followers = x.Followers.Select(p => _mapper.Map<ProfileDto>(p)).ToList();

                return result;
            });
        }

        public IEnumerable<ProfileDto> GetFollowing(string userName)
        {
            if (userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

            var following = _profileProvider.GetFollowingByUserName(userName);

            return following.Select(x => _mapper.Map<ProfileDto>(x));
        }
    }
}
