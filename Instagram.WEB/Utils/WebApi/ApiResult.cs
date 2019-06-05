namespace Instagram.WEB.Utils.WebApi
{
    public class ApiResult
    {
        public static ApiResult Ok { get; }

        public int StatusCode { get; set; }

        public string Message { get; set; }

        static ApiResult()
        {
            Ok = new ApiResult();
        }

        public ApiResult()
        {
            StatusCode = 200;
            Message = "Ok";

        }
    }

    public class ApiResult<T> : ApiResult
    {
        public T Model { get; set; }
    }
}