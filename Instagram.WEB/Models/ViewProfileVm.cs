namespace Instagram.WEB.Models
{
    public class ViewProfileVm
    {
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string ImageUrl { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingCount { get; set; }

        public bool IsFollowing { get; set; }

        public bool IsPrivate { get; set; }
    }
}