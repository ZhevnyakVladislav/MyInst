using System;

namespace Instagram.BusinessLogic
{
    public class BusinessLogicException : Exception
    {
        public string Description { get; set; }

        public BusinessLogicException(string description)
        {
            Description = description;
        }
    }
}