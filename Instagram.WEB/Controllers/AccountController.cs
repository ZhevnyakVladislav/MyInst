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

            if (!ModelState.IsValid)
            {

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Model state is not valid!")
                });
            }

            var user = new UserDTO
            {
                Email = model.Email,
                Password = model.Password
            };

            var claim = await _userService.Authenticate(user);
            AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, claim);

            var createdUser = _userService.GetUserByEmail(user.Email);

            return new UserVm
            {
                Id = createdUser.Id,
                UserName = createdUser.UserName
            }.AsApiResult();
        }

        [HttpPost]
        [Route("register")]
        public async Task<ApiResult> Register(RegisterVm model)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Model state is not valid!")
                });
            }

            var user = new UserDTO
            {
                Email = model.Email,
                Password = model.Password,
                UserName = model.UserName,
                FullName = model.FullName,
                Role = Roles.Admin
            };

            var result = await _userService.CreateAsync(user);

            if (!result.Succeeded)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(result.Errors.ToString())
                });
            }

            var createdUser = _userService.GetUserByEmail(user.Email);

            return new UserVm
            {
                Id = createdUser.Id,
                UserName = createdUser.UserName
            }.AsApiResult();
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
