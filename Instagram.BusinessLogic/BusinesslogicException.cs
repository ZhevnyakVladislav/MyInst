using System;

namespace Instagram.BusinessLogic
{
    public class BusinesslogicException : Exception
    {
        public string Descripion { get; set; }

        public BusinesslogicException(string description)
        {
            Descripion = description;
        }
    }
}