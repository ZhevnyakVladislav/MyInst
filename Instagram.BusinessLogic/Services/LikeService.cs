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

namespace Instagram.BusinessLogic.Services
{
    public class LikeService : ILikeService
    {
        private readonly ILikeProvider _likeProvider;

        private readonly IMapper _mapper;


        public LikeService() : this(IoContainer.Resolve<ILikeProvider>(), IoContainer.Resolve<IMapper>()) {}

        public LikeService(ILikeProvider likeProvider, IMapper mapper)
        {
            _likeProvider = likeProvider ?? throw new ArgumentException(nameof(likeProvider));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        public void CreateLike(int postId, int userId)
        {
            var like = new Like() { PostId = postId, UserId = userId};

            _likeProvider.CreateLike(like);
        }

        public IEnumerable<LikeDto> GetPostLikes(int postId)
        {
            return _likeProvider.GetPostLikes(postId).Select(l => _mapper.Map<LikeDto>(l));
        }
    }
}
