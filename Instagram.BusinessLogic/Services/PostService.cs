using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.BusinessLogic.Services
{
    public class PostService : IPostService
    {
        private readonly IPostProvider _postProvider;

        private readonly IProfileService  _profileService;

        private readonly IImageService _imageService;

        private readonly IMapper _mapper;

        public PostService() : this(IoContainer.Resolve<IPostProvider>(), IoContainer.Resolve<IProfileService>(), IoContainer.Resolve<IImageService>(), IoContainer.Resolve<IMapper>()) { }


        public PostService(IPostProvider postProvider, IProfileService profileService, IImageService imageService, IMapper mapper)
        {
            _postProvider = postProvider ?? throw new ArgumentException(nameof(postProvider));
            _profileService = profileService ?? throw new ArgumentException(nameof(profileService));
            _imageService = imageService ?? throw new ArgumentException(nameof(imageService));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        public void CreatePost(PostDto post)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PostDto> GetUserPosts(string userName)
        {
            var posts = _postProvider.GetUserPosts(userName);

            return posts.Select(p => _mapper.Map<PostDto>(p));
        }

        public IEnumerable<PostDto> GetFollowingUsersPosts(string userName)
        {
            var followingUserNames = _profileService.GetFollowing(userName).Select(p => p.UserName);
            var followingUserPosts = _postProvider.GetFollowingPost(followingUserNames).ToList();
            followingUserPosts.Sort((x, y) => DateTime.Compare(x.CreatedAt, y.CreatedAt));

            return followingUserPosts.Select(p => _mapper.Map<PostDto>(p));
        }
    }
}
