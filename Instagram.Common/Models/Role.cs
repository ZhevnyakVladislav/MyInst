using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNet.Identity;

namespace Instagram.Common.Models
{
    public class Role : BaseModel, IRole<int>
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}