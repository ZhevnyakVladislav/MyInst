using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using Instagram.WEB.Utils;
using Instagram.WEB.Utils.ErrorHandling;
using Instagram.WEB.Utils.Jwt;
using Newtonsoft.Json.Serialization;

namespace Instagram.WEB
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.EnableCors();
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Services.Replace(typeof(IExceptionHandler), new ApiErrorHandler());
            config.Services.Add(typeof(IExceptionLogger), new AiExceptionLogger());
            config.Filters.Add(new JwtAuthenticationAttribute());
        }
    }
}
