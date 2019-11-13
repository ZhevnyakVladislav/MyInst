using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.Enums;
using Instagram.Common.IoContainer;
using Instagram.WEB.Models;
using Instagram.WEB.Utils;
using Instagram.WEB.Utils.Jwt;
using Instagram.WEB.Utils.WebApi;

namespace Instagram.WEB.Controllers
{
    [RoutePrefix("api/profile")]
    public class ProfileController : ApiController
    {
        private readonly IProfileService _profileService;

        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public ProfileController() : this(IoContainer.Resolve<IProfileService>(), IoContainer.Resolve<IUserService>(), IoContainer.Resolve<IMapper>()) { }

        public ProfileController(IProfileService profileService, IUserService userService, IMapper mapper)
        {
            _profileService = profileService ?? throw new ArgumentException(nameof(profileService));
            _userService = userService ?? throw new ArgumentException(nameof(userService));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        [HttpGet]
        [Route("edit")]
        [Authorize]
        public ApiResult<EditProfileVm> GetEditProfileData([FromUri]string username)
        {
            var profile = _profileService.GetProfileByUserName(username);

            return _mapper.Map<EditProfileVm>(profile).AsApiResult();
        }

        [HttpGet]
        [Route("view")]
        public ApiResult GetViewProfileData([FromUri]string username)
        {
            var profile = _profileService.GetProfileByUserName(username);

            var result = _mapper.Map<ViewProfileVm>(profile);

            result.IsFollowing = profile.Followers.Select(x => x.UserName).Contains(User.Identity.Name);
            result.IsPrivate = result.IsPrivate && !result.IsFollowing;

            return result.AsApiResult();
        }

        [HttpGet]
        [Route("avatar")]
        public ApiResult GetProfileAvatar()
        {
            var profile = _profileService.GetProfileByUserName(User.Identity.Name);

            return profile.ImageUrl.AsApiResult();
        }

        [HttpPost]
        [Route("update")]
        [Authorize]
        public ApiResult UpdateProfile(EditProfileVm model)
        {
            var profile = _mapper.Map<ProfileDto>(model);

            _profileService.UpdateProfile(model.UserName, profile);

            return ApiResult.Ok;
        }

        [HttpPost]
        [Route("updateImage")]
        [Authorize]
        public ApiResult UpdateProfileImage(string userName)
        {
            Stream fileStream = null;

            if (HttpContext.Current.Request.Files.Count == 1)
            {
                fileStream = HttpContext.Current.Request.Files[0].InputStream;
            }

            var imageURL = _profileService.UpdateProfileImage(userName, fileStream);

            return imageURL.AsApiResult();
        }

        [HttpPost]
        [Route("follow")]
        [Authorize]
        public ApiResult Follow(ChangeFollowingVm model)
        {
            _profileService.Follow(model.UserName, User.Identity.Name);

            return ApiResult.Ok;
        }

        [HttpPost]
        [Route("unfollow")]
        [Authorize]
        public ApiResult Unfollow(ChangeFollowingVm model)
        {
            _profileService.Unfollow(model.UserName, User.Identity.Name);

            return ApiResult.Ok;
        }

        [Route("followers")]
        [Authorize]
        public ApiResult GetFollowers(string userName)
        {
            var followers = _profileService.GetFollowers(userName);

            return followers.Select(p =>
            {
                p.IsFollowing = p.Followers.Select(i => i.UserName).Contains(User.Identity.Name);
                return _mapper.Map<ViewProfileVm>(p);
            }).AsApiResult();
        }

        [Route("following")]
        [Authorize]
        public ApiResult GetFollowing(string userName)
        {
            var following = _profileService.GetFollowing(userName);

            return following.ToList().Select(p =>
            {
                p.IsFollowing = true;
                return _mapper.Map<ViewProfileVm>(p);
            }).AsApiResult();
        }
    }
}
