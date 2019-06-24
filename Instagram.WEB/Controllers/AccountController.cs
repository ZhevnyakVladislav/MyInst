using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.Enums;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.WEB.Models;
using Instagram.WEB.Utils.WebApi;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace Instagram.WEB.Controllers
{
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private static IAuthenticationManager AuthenticationManager => HttpContext.Current.GetOwinContext().Authentication;

        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public AccountController() : this(IoContainer.Resolve<IUserService>(), IoContainer.Resolve<IMapper>()) { }

        public AccountController(IUserService userService, IMapper mapper)
        {
            _userService = userService ?? throw new ArgumentException(nameof(userService));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        [HttpPost]
        [Route("login")]
        public async Task<ApiResult> Login(LoginVm model)
        {
            if (User.Identity.IsAuthenticated) return new ApiResult { StatusCode = 404, Message = "User is already authenticated" };

            var user = _mapper.Map<UserDto>(model);
            var authenticatedUser =  await AuthenticateUser(user);

            return _mapper.Map<UserVm>(authenticatedUser).AsApiResult();
           
        }

        [HttpPost]
        [Route("register")]
        public async Task<ApiResult> Register(RegisterVm model)
        {
            var user = _mapper.Map<UserDto>(model);
            user.Role = Roles.Admin;

            await _userService.CreateUserAsync(user);
            var authenticatedUser = await AuthenticateUser(user);

            return _mapper.Map<UserVm>(authenticatedUser).AsApiResult();
        }

        [HttpPost]
        [Route("logout")]
        public ApiResult Logout()
        {
            AuthenticationManager.SignOut();

            return ApiResult.Ok;
        }

        private async Task<UserDto> AuthenticateUser(UserDto user)
        {
            var claim = await _userService.AuthenticateUser(user);
            AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, claim);

            return _userService.GetUserByUserName(user.UserName);
        }
    }
}
