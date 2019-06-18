using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.Enums;
using Instagram.Common.IoContainer;
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

        public AccountController() : this(IoContainer.Resolve<IUserService>()) { }

        public AccountController(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentException(nameof(userService));
        }

        [HttpPost]
        [Route("login")]
        public async Task<ApiResult> Login(LoginVm model)
        {
            if (User.Identity.IsAuthenticated) return new ApiResult { StatusCode = 404, Message = "User is already authenticated" };

            var user = new UserDTO
            {
                UserName = model.Username,
                Password = model.Password
            };

            var claim = await _userService.Authenticate(user);
            AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, claim);

            var createdUser = _userService.GetUserByUserName(user.UserName);

            return new UserVm
            {
                UserName = createdUser.UserName
            }.AsApiResult();
        }

        [HttpPost]
        [Route("register")]
        public async Task<ApiResult> Register(RegisterVm model)
        {

            var user = new UserDTO
            {
                Email = model.Email,
                Password = model.Password,
                UserName = model.UserName,
                FullName = model.FullName,
                Role = Roles.Admin
            };

            await _userService.CreateAsync(user);

            return ApiResult.Ok;
        }

        [HttpPost]
        [Route("logout")]
        public ApiResult Logout()
        {
            AuthenticationManager.SignOut();

            return ApiResult.Ok;
        }
    }
}
