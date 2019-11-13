using System.Collections.Generic;

namespace Instagram.WEB.Models
{
    public class InfiniteScrollVm
    {

        public List<PostVm> Posts { get; set; }

        public bool HasMore { get; set; }
    }
}