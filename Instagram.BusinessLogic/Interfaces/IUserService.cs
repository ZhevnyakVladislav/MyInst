using Instagram.BusinessLogic.Entities;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Instagram.BusinessLogic.Interfaces
{
    public interface IUserService
    {
        Task CreateUserAsync(UserDto user);

        Task<ClaimsIdentity> AuthenticateUserAsync(UserDto userDto);

        UserDto GetUserByEmail(string email);

        UserDto GetUserByUserName(string userName);

        Task<UserDto> ConfirmUserEmailAsync(string userName, string code);

        Task RecoverUserAsync(string userName);

        Task ResetPasswordAsync(string userName, string token, string newPassword);

        Task ChangePassword(string userName, string oldPassword, string newPassword, string confirmPassword);

        void UpdateUserName(string oldUserName, string newUserName);
    }
}
