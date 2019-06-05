using System.Web.Mvc;
using Instagram.WEB.Utils.ErrorHandling;

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