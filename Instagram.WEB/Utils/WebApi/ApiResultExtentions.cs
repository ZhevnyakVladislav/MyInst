using System;
using System.Web;

namespace Instagram.WEB.Utils.WebApi
{
    public static class ApiResultExtentions
    {
        public static ApiResult<T> AsApiResult<T>(this T model, Func<T, bool> isNotFound, string message)
        {
            return model.AsApiResult(isNotFound(model) ? 404 : 200, message);
        }

        public static ApiResult<T> AsApiResult<T>(this T model, int code = 200, string message = null)
        {
            HttpContext.Current.Response.StatusCode = code;

            var result = new ApiResult<T>()
            {
                StatusCode = code,
                Message = message ?? HttpWorkerRequest.GetStatusDescription(code),
                Model = model
            };

            if (HttpContext.Current != null)
            {
                HttpContext.Current.Response.StatusCode = result.StatusCode;
            }

            return result;
        }
    }
}