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
                    case SqlException sqlException when sqlException.Number == -2 || sqlException.Number == 4060 || sqlException.Number == -1 || sqlException.Number == 2: //-2 means TIMEOUT_EXPIRED. It is described in System.Data.SqlClient.TdsEnums, 11 means 'General Network Error', that can be interpreted as timeout, -1 and 2 are errors on SQL server connection, 4060 - Cannot open database {database} requested by the login
                        apiResult.Message = "We are experiencing technical difficulties. We apologize for the inconvenience and thank you for your patience while we work to get you back up and running. Please try again in a few minutes.Thank you! The DealCloud Support Team";
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

            //return View("Error", new ErrorVm
            //{
            //    StatusCode = apiResult.StatusCode,
            //    Description = apiResult.Errors != null && apiResult.Errors.Any()
            //        ? string.Join(". ", apiResult.Errors.Select(e => e.Message.TrimEnd('.')).Where(m => !m.IsNullOrWhiteSpace()))
            //        : apiResult.Message,
            //    TakeMeHome = shouldLogout ? Url.Action("Logout", "Account") : Url.Action("Index", "App")
            //});
        }
    }
}