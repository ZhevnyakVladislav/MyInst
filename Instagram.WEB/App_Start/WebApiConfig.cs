using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using Instagram.WEB.Utils.CookieHandler;
using Instagram.WEB.Utils.ErrorHandling;
using Newtonsoft.Json.Serialization;

namespace Instagram.WEB
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.MessageHandlers.Add(new CookieHandler());
            config.Services.Replace(typeof(IExceptionHandler), new ApiErrorHandler());
            config.Services.Add(typeof(IExceptionLogger), new AiExceptionLogger());
        }
    }
}
