using System;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using NLog;

namespace Instagram.WEB.Utils.ErrorHandling
{
    public class WebErrorHandler
    {
        private static readonly Logger _log = LogManager.GetCurrentClassLogger();

        public static void OnEndRequest(HttpContext context)
        {
            if (context.Response.StatusCode == 404)
            {
                Handle(context, new HttpException(404, "Not Found"));
            }
            else if (context.Response.StatusCode == 401)
            {
                Handle(context, new HttpException(401, "Unauthorized"));
            }
        }

        public static void Handle(HttpContext context, Exception exception = null)
        {
            try
            {
                if (context == null) throw new ArgumentNullException(nameof(context));

                var statusCode = HttpStatusCode.InternalServerError;

                if (exception is HttpException)
                {
                    statusCode = (HttpStatusCode)((HttpException)exception).GetHttpCode();

                }
                else if (exception is UnauthorizedAccessException)
                {
                    statusCode = HttpStatusCode.Forbidden;
                }

                IController controller = ControllerBuilder.Current.GetControllerFactory().CreateController(context.Request.RequestContext, "App");

                var errorRoute = new RouteData();
                const string typeValue = "type";
                var mvcHandler = context.CurrentHandler as MvcHandler;

                errorRoute.Values.Add("controller", "App");
                errorRoute.Values.Add("action", "HandleError");
                errorRoute.Values.Add("statusCode", (int)statusCode);
                errorRoute.Values.Add("exception", exception);
                errorRoute.Values.Add(typeValue, mvcHandler?.RequestContext.RouteData.Values[typeValue]);

                controller.Execute(new RequestContext(context.Request.RequestContext.HttpContext, errorRoute));

                context.Server.ClearError();
            }
            catch (Exception e)
            {
                _log.Error(e, "Application error during error handling, loop handling was terminated.");
            }
        }
    }
}