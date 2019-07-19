using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;
using Instagram.WEB.Utils.ErrorHandling;
using NLog;

namespace Instagram.WEB.Utils.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        public static readonly Logger _log = LogManager.GetCurrentClassLogger();

        public override void OnException(HttpActionExecutedContext context)
        {

            if (context == null || !HttpContext.Current.IsCustomErrorEnabled)
            {
                base.OnException(context);

                return;
            }

            if (context.Exception != null)
            {
                _log.Error(context.Exception, "Unhandled exception");
            }
            else
            {
                _log.Warn("Unhandled exception. Target exception was not found in the ExceptionContext.");
            }

            WebErrorHandler.Handle(HttpContext.Current, context.Exception);

            context.Response = new HttpResponseMessage()
            {
                ReasonPhrase = null,
                Content = null,
                StatusCode = (HttpStatusCode)HttpContext.Current.Response.StatusCode
            };
        }

    }
}