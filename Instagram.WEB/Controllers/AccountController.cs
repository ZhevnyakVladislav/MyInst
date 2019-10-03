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
        [Route("register")]
        [AllowAnonymous]
        public async Task<ApiResult> Register(RegisterVm model)
        {
            var user = _mapper.Map<UserDto>(model);
            user.Role = Roles.Admin;

            await _userService.CreateUserAsync(user);

            return ApiResult.Ok;
        }

        [HttpPost]
        [Route("confirmEmail")]
        [AllowAnonymous]
        public async Task<ApiResult> ConfirmEmail(RegisterVm model)
        {
            var user = await _userService.ConfirmUserEmailAsync(model.UserName, model.VerificationCode);

            user.Password = model.Password;
            var claim = await _userService.AuthenticateUserAsync(user);

            AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = true }, claim);

            return _mapper.Map<UserVm>(user).AsApiResult();
        }

        [HttpPost]
        [Route("password/recover")]
        [AllowAnonymous]
        public async Task<ApiResult> RecoverAccount(ResetPasswordVm model)
        {
            await _userService.RecoverUserAsync(model.UserName);

            return ApiResult.Ok;
        }

        [HttpPost]
        [Route("password/reset")]
        [AllowAnonymous]

        public async Task<ApiResult> ResetPassword(ResetPasswordVm model)
        {
            await _userService.ResetPasswordAsync(model.UserName, model.Token, model.Password);

            return ApiResult.Ok;
        }

        [HttpPost]
        [Route("password/change")]
        public async Task<ApiResult> ChangePassword(ChangePasswordVm model)
        {
            await _userService.ChangePassword(User.Identity.Name, model.OldPassword, model.NewPassword, model.ConfirmPassword);

            return ApiResult.Ok;
        }
    }
}
