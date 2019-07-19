using System.Web.Mvc;
using Instagram.WEB.Utils.ErrorHandling;
using Instagram.WEB.Utils.Filters;
using Instagram.WEB.Utils.Jwt;

namespace Instagram.WEB
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new MvcErrorHandler());
        }
    }
}