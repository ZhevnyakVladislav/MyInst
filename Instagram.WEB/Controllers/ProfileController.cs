using System;
using System.Web.Http;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.Enums;
using Instagram.Common.IoContainer;
using Instagram.WEB.Models;
using Instagram.WEB.Utils.WebApi;

namespace Instagram.WEB.Controllers
{
    [Authorize]
    [RoutePrefix("api/profile")]
    public class ProfileController : ApiController
    {
        private readonly IProfileService _profileService;

        private readonly IUserService _userService;

        public ProfileController() : this(IoContainer.Resolve<IProfileService>(), IoContainer.Resolve<IUserService>()) { }

        public ProfileController(IProfileService profileService, IUserService userService)
        {
            _profileService = profileService ?? throw new ArgumentException(nameof(profileService));
            _userService = userService ?? throw new ArgumentException(nameof(userService));
        }

        [HttpGet]
        [Route("")]
        public ApiResult<ProfileVm> Get([FromUri]string username)
        {
            var profile = _profileService.GetProfileByUserName(username);
            var user = _userService.GetUserByUserName(username);

            return new ProfileVm
            {
                UserName = user.UserName,
                FullName = profile.FullName,
            }.AsApiResult();
        }
    }
}
