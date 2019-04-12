using System;
using System.Data.Entity;
using System.Threading.Tasks;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.EntityFramework;
using Instagram.DBProviders.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Instagram.DBProviders.Identity
{
    //public class IdentityUnitOfWork : IUnitOfWork
    //{
    //    private readonly DbContext _db;

    //    public UserManager<User, int> AppUserManager { get; }

    //    public IProfileProvider ProfileProvider { get; }

    //    public RoleManager<Role, int> AppRoleManager { get; }

    //    public IdentityUnitOfWork() : this(IoContainer.Resolve<AppDbContext>(), IoContainer.Resolve<IProfileProvider>(), IoContainer.Resolve<UserManager<User, int>>(), IoContainer.Resolve<RoleManager<Role, int>>()) { }

    //    public IdentityUnitOfWork(DbContext context, IProfileProvider profileProvider, UserManager<User, int> userManager, RoleManager<Role, int> roleManager)
    //    {
    //        _db = context ?? throw new ArgumentException(nameof(context));
    //        AppUserManager = userManager ?? throw new ArgumentException(nameof(userManager));
    //        AppRoleManager = roleManager ?? throw new ArgumentException(nameof(roleManager));
    //        ProfileProvider = profileProvider ?? throw new ArgumentException(nameof(context));
    //    }

    //    public async Task SaveAsync()
    //    {
    //        await _db.SaveChangesAsync();
    //    }

    //    public void Save()
    //    {
    //        _db.SaveChanges();
    //    }

    //    public void Dispose()
    //    {
    //        Dispose(true);
    //        GC.SuppressFinalize(this);
    //    }

    //    private bool _disposed;

    //    public virtual void Dispose(bool disposing)
    //    {
    //        if (!_disposed)
    //        {
    //            if (disposing)
    //            {
    //                AppUserManager.Dispose();
    //                AppRoleManager.Dispose();
    //            }
    //            _disposed = true;
    //        }
    //    }
    //}
}