using System;
using System.Collections.Generic;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.IoContainer;
using Instagram.DBProviders.Interfaces;
using Instagram.DBProviders.Providers;
using Instagram.Common.Models;
using AutoMapper;
using System.Linq;
using Microsoft.AspNet.Identity;

namespace Instagram.BusinessLogic.Services
{
    public class LikeService : ILikeService
    {
        private readonly ILikeProvider _likeProvider;

        private readonly UserManager<User, int> _userManager;

        private readonly IMapper _mapper;


        public LikeService() : this(IoContainer.Resolve<ILikeProvider>(), IoContainer.Resolve<UserManager<User, int>>(), IoContainer.Resolve<IMapper>()) {}

        public LikeService(ILikeProvider likeProvider, UserManager<User, int> userManager, IMapper mapper)
        { 
            _likeProvider = likeProvider ?? throw new ArgumentException(nameof(likeProvider));
            _userManager = userManager ?? throw new ArgumentException(nameof(userManager));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        public LikeDto LikeOrUnlikePost(int postId, string userName)
        {
            var user = _userManager.FindByName(userName);
            var postLikes = _likeProvider.GetPostLikes(postId);
            var like = postLikes.FirstOrDefault(l => l.User.UserName == userName);

            if (like == null)
            {
                like = new Like { PostId = postId, UserId = user.Id };
                var likeId = _likeProvider.CreateLike(like);

                return _mapper.Map<LikeDto>(_likeProvider.GetLikeById(likeId));
            } else
            {
                _likeProvider.DeleteLike(like.Id);
            }

            return null;
        }


        public IEnumerable<LikeDto> GetPostLikes(int postId)
        {
            return _likeProvider.GetPostLikes(postId).Select(l => _mapper.Map<LikeDto>(l));
        }
    }
}
