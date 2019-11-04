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

        private readonly ILikeService _likeService;

        private readonly IMapper _mapper;

        public PostController() : this(IoContainer.Resolve<IPostService>(), IoContainer.Resolve<ICommentService>(), IoContainer.Resolve<ILikeService>(), IoContainer.Resolve<IMapper>()) { }

        public PostController(IPostService postService, ICommentService commentService, ILikeService likeService, IMapper mapper)
        {
            _postService = postService ?? throw new ArgumentException(nameof(postService));
            _commentService = commentService ?? throw new ArgumentException(nameof(commentService));
            _likeService = likeService ?? throw new ArgumentException(nameof(likeService));
            _mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        [HttpGet]
        [Route("profilePosts")]
        [Authorize]
        public ApiResult GetProfilePosts([FromUri]string userName)
        {
            var posts = _postService.GetUserPosts(userName);

            return posts.Select(p =>
            {
                p.Likes = null;
                p.Comments = null;
                return _mapper.Map<PostVm>(p);
            }).AsApiResult();
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public ApiResult GetPost([FromUri]int id = 0)
        {
            var post = _postService.GetPostById(id);

            return _mapper.Map<PostVm>(post).AsApiResult();
        }

        [HttpPost]
        [Route("comments/add")]
        [Authorize]
        public ApiResult PostComment(PostCommentVm model)
        {
            var comment = new CommentDto { Text = model.Text };

            var createdComment = _commentService.CreateComment(model.PostId, User.Identity.Name, comment);

            return _mapper.Map<CommentVm>(createdComment).AsApiResult();
        }

        [HttpPost]
        [Route("comments/delete")]
        [Authorize]
        public ApiResult PostComment([FromBody]int commentId)
        {
            _commentService.DeleteComment(commentId);

            return ApiResult.Ok;
        }

        [HttpPost]
        [Route("likes/add")]
        [Authorize]
        public ApiResult LikePost([FromBody]int postId)
        {
            var like = _likeService.LikeOrUnlikePost(postId, User.Identity.Name);

            return _mapper.Map<LikeVm>(like).AsApiResult();
        }

        [HttpPost]
        [Route("likes/delete")]
        [Authorize]
        public ApiResult DeleteLike([FromBody]int postId)
        {
            _likeService.LikeOrUnlikePost(postId, User.Identity.Name);

            return ApiResult.Ok;
        }

        [HttpGet]
        [Route("likes")]
        [Authorize]
        public ApiResult GetPostLikes([FromUri]int postId = 0)
        {
            var likes = _likeService.GetPostLikedBy(postId);

            return likes.Select(l => _mapper.Map<ViewProfileVm>(l)).AsApiResult();
        }
    }
}