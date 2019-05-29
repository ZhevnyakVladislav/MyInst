using System;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;

namespace Instagram.BusinessLogic.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileProvider _profileProvider;

        public ProfileService() : this(IoContainer.Resolve<IProfileProvider>()) { }

        public ProfileService(IProfileProvider profileProvider)
        {
            _profileProvider = profileProvider ?? throw new ArgumentException(nameof(profileProvider));
        }

        public async Task Create(UserDTO user)
        {
            if(user == null) throw new ArgumentNullException(nameof(user));

            UserProfile userProfile = new UserProfile()
            {
                Email = user.Email,
                FullName = user.FullName,
                UserName = user.UserName
            };

            _profileProvider.Create(userProfile);
        }
    }
}
