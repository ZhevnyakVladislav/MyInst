using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Instagram.Common.Enums;
using Instagram.Common.Extensions;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.EntityFramework;
using Microsoft.AspNet.Identity;

namespace Instagram.DBProviders
{
    public class UserStore : IUserStore<User, int>, IUserPasswordStore<User, int>, IUserRoleStore<User, int>, IUserEmailStore<User, int>
    {
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        #region [UserStore]

        public Task CreateAsync(User user)
        {
            if (user == null) throw new ArgumentException(nameof(user));

            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }

            return Task.CompletedTask;

        }
        public Task UpdateAsync(User user)
        {

            throw new NotImplementedException();
        }

        public Task DeleteAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> FindByIdAsync(int userId)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                return Task.FromResult(context
                    .Set<User>()
                    .Include(item => item.Role)
                    .FirstOrDefault(item => item.Id == userId)
                );
            }
        }

        public Task<User> FindByNameAsync(string userName)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                return Task.FromResult(context
                    .Set<User>()
                    .FirstOrDefault(item => item.UserName == userName)
                );
            }
        }

        #endregion

        #region [UserPasswordStore]

        public Task SetPasswordHashAsync(User user, string passwordHash)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.PasswordHash = passwordHash;

            return Task.CompletedTask;
        }

        public Task<string> GetPasswordHashAsync(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.PasswordHash.IsNullOrEmpty());
        }

        #endregion

        #region [UserRoleStore]

        public Task AddToRoleAsync(User user, string roleName)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            int roleId;

            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                roleId = context.Set<Role>().FirstOrDefault(item => item.Name == roleName)?.Id ?? 0;
            }

            if (roleId > 0)
            {
                user.RoleId = roleId;
            }

            return Task.CompletedTask;
        }

        public Task RemoveFromRoleAsync(User user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task<IList<string>> GetRolesAsync(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));


            IList<string> roles = new List<string> { user.Role?.Name };

            return Task.FromResult(roles);
        }

        public Task<bool> IsInRoleAsync(User user, string roleName)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            throw new NotImplementedException();
        }

        #endregion

        #region [UserEmailStore]

        public Task SetEmailAsync(User user, string email)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (string.IsNullOrWhiteSpace(email)) throw new ArgumentNullException(nameof(email));

            user.Email = email;
            user.UserName = email;

            return Task.CompletedTask;
        }

        public Task<string> GetEmailAsync(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            return Task.FromResult(user.EmailVerified);
        }

        public Task SetEmailConfirmedAsync(User user, bool confirmed)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            user.EmailVerified = confirmed;

            return Task.FromResult(user.EmailVerified);
        }

        public Task<User> FindByEmailAsync(string email)
        {
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                return Task.FromResult(context
                    .Set<User>()
                    .Include(item => item.Role)
                    .FirstOrDefault(item => item.Email == email)
                );
            }
        }

        #endregion

    }
}