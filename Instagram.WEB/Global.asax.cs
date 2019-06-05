using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;
using Instagram.WEB.Utils.ErrorHandling;
using NLog;

namespace Instagram.WEB
{
    public class Global : HttpApplication
    {
        private static readonly Logger _log = LogManager.GetCurrentClassLogger();


        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            GlobalConfiguration.Configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;

            MvcHandler.DisableMvcResponseHeader = true;
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        }

        protected void Application_Error()
        {
            var exception = Context.Server.GetLastError();

            if (exception != null)
            {
                _log.Error(exception, "Application error.");

                if (Context.IsCustomErrorEnabled)
                {
                    WebErrorHandler.Handle(Context, exception);
                }
            }

            CompleteRequest();
        }
    }
}