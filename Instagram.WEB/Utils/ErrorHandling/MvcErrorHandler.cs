using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using NLog;

namespace Instagram.WEB.Utils.ErrorHandling
{
    public class MvcErrorHandler : HandleErrorAttribute
    {
        public static readonly Logger _log = LogManager.GetCurrentClassLogger();

        public override void OnException(ExceptionContext filterContext)
        {
            if (filterContext == null || !filterContext.HttpContext.IsCustomErrorEnabled)
            {
                base.OnException(filterContext);

                return;
            }

            if (filterContext.ExceptionHandled)
            {
                return;
            }

            if (filterContext.Exception != null)
            {
                _log.Error(filterContext.Exception, "Unhandled exception");
            }
            else
            {
                _log.Warn("Unhandled exception. Target exception was not found in the ExceptionContext.");
            }

            WebErrorHandler.Handle(HttpContext.Current, filterContext.Exception);

            filterContext.ExceptionHandled = true;
            filterContext.Result = null;
        }
    }
}