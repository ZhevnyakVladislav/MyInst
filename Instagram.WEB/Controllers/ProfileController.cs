using System;
using System.Web.Http;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.IoContainer;
using Instagram.WEB.Models;
using Instagram.WEB.Utils.WebApi;

namespace Instagram.WEB.Controllers
{
    [RoutePrefix("api/profile")]
    public class ProfileController : ApiController
    {
        private readonly IProfileService _profileService;

        public ProfileController() : this(IoContainer.Resolve<IProfileService>()) { }

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService ?? throw new ArgumentException(nameof(profileService));
        }

        [HttpGet]
        [Route("")]
        public ApiResult<ProfileVm> Get([FromUri]string username)
        {
            var profile = _profileService.GetProfileByUserName(username);

            return new ProfileVm
            {
                FullName = profile.FullName
            }.AsApiResult();
        }
    }
}
