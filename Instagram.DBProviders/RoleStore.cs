using Instagram.Common.Extensions;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.EntityFramework;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Instagram.DBProviders
{
    public class RoleStore : IRoleStore<Role, int>
    {

        public void Dispose()
        {
            Dispose();
        }

        public Task CreateAsync(Role role)
        {
            if (role == null) throw new ArgumentNullException();

            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                context.Roles.Add(role);
                context.SaveChanges();
            }

            return Task.CompletedTask;
        }

        public Task UpdateAsync(Role role)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteAsync(Role role)
        {
            throw new System.NotImplementedException();
        }

        public Task<Role> FindByIdAsync(int roleId)
        {
            throw new System.NotImplementedException();
        }

        public Task<Role> FindByNameAsync(string roleName)
        {
            if (roleName.IsNullOrEmpty()) throw new ArgumentNullException();
            using (var context = IoContainer.Resolve<AppDbContext>())
            {
                return Task.FromResult(context.Set<Role>().FirstOrDefault(item => item.Name == roleName));
            }
        }
    }
}