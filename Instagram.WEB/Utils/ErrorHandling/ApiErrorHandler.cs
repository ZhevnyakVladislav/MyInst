using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.ExceptionHandling;
using NLog;


namespace Instagram.WEB.Utils.ErrorHandling
{
    public class ApiErrorHandler : ExceptionHandler
    {
        private static readonly Logger _log = LogManager.GetCurrentClassLogger();

        public override void Handle(ExceptionHandlerContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));

            if (!HttpContext.Current.IsCustomErrorEnabled)
            {
                _log.Error(context.Exception, "Application error.");

                base.Handle(context);

                return;
            }

            if (context.Exception != null)
            {
                _log.Error(context.Exception, "Unhandled api exception.");
            }
            else
            {
                _log.Warn("Unhandled api exception. Target exception was not found in the ExceptionHandlerContext.");
            }

            WebErrorHandler.Handle(HttpContext.Current, context.Exception);

            context.Result = null;

        }
    }
}