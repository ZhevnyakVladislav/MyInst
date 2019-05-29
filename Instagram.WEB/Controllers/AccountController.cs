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
using Microsoft.Owin.Security;

namespace Instagram.WEB.Controllers
{
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
        [Route("api/account/login")]
        public async Task Login(LoginVm model)
        {
            if (User.Identity.IsAuthenticated) return;

            if (!ModelState.IsValid)
            {
                
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Model state is not valid!")
                });
            }

            try
            {
                var user = new UserDTO
                {
                    Email = model.Email,
                    Password = model.Password
                };

                var claim = await _userService.Authenticate(user);
                AuthenticationManager.SignIn(new AuthenticationProperties {IsPersistent = true}, claim);
            }
            catch
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Wrong email or password!")
                });
            }
        }

        [HttpPost]
        [Route("api/account/register")]
        public async Task Register(RegisterVm model)
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
        }

        [HttpPost]
        [Route("api/account/logout")]
        public void Logout()
        {
            AuthenticationManager.SignOut();
        }
    }
}
