using AutoMapper;
using Instagram.BusinessLogic.Entities;
using Instagram.BusinessLogic.Interfaces;
using Instagram.Common.IoContainer;
using Instagram.WEB.Models;
using Instagram.WEB.Utils.WebApi;
using System;
using System.Linq;
using System.Web.Http;

namespace Instagram.WEB.Controllers
{
    [RoutePrefix("api/post")]
    public class PostController : ApiController
    {
        private readonly IPostService _postService;

        private readonly ICommentService _commentService;

        private readonly IMapper _mapper;

        public PostController() : this(IoContainer.Resolve<IPostService>(), IoContainer.Resolve<ICommentService>(), IoContainer.Resolve<IMapper>()) { }

        public PostController(IPostService postService, ICommentService commentService, IMapper mapper)
        {
            _postService = postService ?? throw new ArgumentException(nameof(postService));
            _commentService = commentService ?? throw new ArgumentException(nameof(commentService));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        [HttpGet]
        [Route("profilePosts")]
        [Authorize]
        public ApiResult GetProfilePosts([FromUri]string userName)
        {
            var posts = _postService.GetUserPosts(userName);

            return posts.Select(p => _mapper.Map<PostVm>(p)).AsApiResult();
        }

        [HttpPost]
        [Route("comments/add")]
        [Authorize]
        public ApiResult PostComment(PostCommentVm model)
        {
            var comment = new CommentDto { Text = model.Text };

            var createdComment =_commentService.CreateComment(model.PostId, User.Identity.Name, comment);

            return _mapper.Map<CommentVm>(createdComment).AsApiResult();
        }
    }
}