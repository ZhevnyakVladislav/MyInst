using System;
using System.Web.Http;
using AutoMapper;
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

        private readonly IMapper _mapper;

        public ProfileController() : this(IoContainer.Resolve<IProfileService>(), IoContainer.Resolve<IUserService>(), IoContainer.Resolve<IMapper>()) { }

        public ProfileController(IProfileService profileService, IUserService userService, IMapper mapper)
        {
            _profileService = profileService ?? throw new ArgumentException(nameof(profileService));
            _userService = userService ?? throw new ArgumentException(nameof(userService));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        [HttpGet]
        [Route("")]
        public ApiResult<ProfileVm> Get([FromUri]string username)
        {
            var profile = _profileService.GetProfileByUserName(username);

            return _mapper.Map<ProfileVm>(profile).AsApiResult();
        }
    }
}
