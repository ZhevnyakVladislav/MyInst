using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Instagram.WEB.Utils.CookieHandler
{
    public class CookieHandler : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            HttpResponseMessage response = await base.SendAsync(request, cancellationToken);

            response.Headers.AddCookies(new CookieHeaderValue[]
            {
                new CookieHeaderValue("userName", request.GetRequestContext().Principal.Identity.Name)
            });

            return response;
        }
    }
}