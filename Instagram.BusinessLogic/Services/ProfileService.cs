using System;
using System.Threading.Tasks;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.Extensions;
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

        public void Create(UserDTO user)
        {
            if(user == null) throw new ArgumentNullException(nameof(user));

            UserProfile userProfile = new UserProfile
            {
                FullName = user.FullName,
            };

            _profileProvider.Create(userProfile);
        }

        public UserProfile GetProfileByUserName(string userName)
        {
            if(userName.IsNullOrEmpty()) throw new ArgumentNullException(nameof(userName));

            var profile = _profileProvider.GetProfileByUserName(userName);

            if (profile == null)
            {
                throw  new BusinesslogicException($"Profile with userName={userName} was not found.");
            }

            return profile;
        }
    }
}
