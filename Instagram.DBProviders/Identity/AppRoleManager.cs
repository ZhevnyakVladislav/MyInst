using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Instagram.DBProviders.Identity
{
    public class AppRoleManager : RoleManager<Role, int>
    {
        public AppRoleManager() : this(IoContainer.Resolve<IRoleStore<Role, int>>()) { }

        public  AppRoleManager(IRoleStore<Role, int> store) : base(store) { }
    }
}