using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.IoContainer;
using Instagram.Common.Models;
using Instagram.DBProviders.Interfaces;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;

namespace Instagram.BusinessLogic.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentProvider _commentProvider;

        private readonly UserManager<User, int> _userManager;

        private readonly IMapper _mapper;

        public CommentService() : this(IoContainer.Resolve<ICommentProvider>(), IoContainer.Resolve<UserManager<User, int>>(), IoContainer.Resolve<IMapper>()) { }

        public CommentService(ICommentProvider commentProvider, UserManager<User, int> appUserManager, IMapper mapper)
        {
            _commentProvider = commentProvider ?? throw new ArgumentException(nameof(commentProvider));
            _userManager = appUserManager ?? throw new ArgumentException(nameof(appUserManager));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        public CommentDto CreateComment(int postId, string userName, CommentDto commentDto)
        {
            var user = _userManager.FindByName(userName);

            var comment = new Comment()
            {
                PostId = postId,
                UserId = user.Id,
                Text = commentDto.Text,
            };

            var createdCommentId = _commentProvider.CreateComment(comment);

            return _mapper.Map<CommentDto>(_commentProvider.GetCommentById(createdCommentId));
        }

       

        public IEnumerable<CommentDto> GetPostComments(int postId)
        {
            throw new NotImplementedException();
        }
    }
}
