using System;
using System.Data.SqlClient;
using System.Web;
using System.Web.Mvc;
using Instagram.BusinessLogic;
using Instagram.WEB.Utils.WebApi;
using Microsoft.Owin.Security;

namespace Instagram.WEB.Controllers
{
    public class AppController : Controller
    {
        public IAuthenticationManager AuthenticationManager => HttpContext.GetOwinContext().Authentication;

        public ActionResult HandleError(int statusCode = 404, Exception exception = null)
        {
            HttpContext.Response.Clear();
            HttpContext.Response.TrySkipIisCustomErrors = true;

            var apiResult = new ApiResult { StatusCode = statusCode, Message = HttpWorkerRequest.GetStatusDescription(statusCode) };
            var shouldLogout = statusCode == 403;

            if (exception is AggregateException aggregateException)
            {
                aggregateException = aggregateException.Flatten();
                if (aggregateException.InnerExceptions.Count == 1)
                {
                    exception = aggregateException.InnerExceptions[0];
                }
            }

            if (exception != null)
            {
                switch (exception)
                {
                    case ArgumentException argumentException:
                        apiResult.StatusCode = 400;
                        apiResult.Message = argumentException.Message;
                        break;
                    case BusinesslogicException businesslogicException:
                        apiResult.Message = businesslogicException.Descripion;
                        break;
                    default:
                        if (apiResult.StatusCode != 500)
                        {
                            apiResult.Message = exception.Message;
                        }
                        break;
                }
            }

            HttpContext.Response.StatusCode = apiResult.StatusCode;
            HttpContext.Response.ContentType = "text/html";
            
            return new JsonResult()
            {
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                Data = apiResult
            };
        }
    }
}