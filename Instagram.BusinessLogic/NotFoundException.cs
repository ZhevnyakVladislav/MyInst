using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instagram.BusinessLogic
{
    public class NotFoundException : Exception
    {
        public string Description { get; set; }

        public NotFoundException(string description)
        {
            Description = description;
        }
    }
}
