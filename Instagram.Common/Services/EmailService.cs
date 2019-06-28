using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Instagram.Common.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await SendEmailAsync(message);
        }

        private async Task SendEmailAsync(IdentityMessage message)
        {
            using (var client = new SmtpClient("smtp.office365.com", 587))
            {
                var userName = Environment.GetEnvironmentVariable("EMAIL_SERVICE_USER_NAME");
                var password = Environment.GetEnvironmentVariable("EMAIL_SERVICE_PASSWORD");
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(userName, password);
                client.EnableSsl = true;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;

                var msg = new MailMessage()
                {
                    Body = message.Body,
                    Subject = message.Subject,
                    IsBodyHtml = true,
                    From = new MailAddress(userName),
                    To = { message.Destination }
                };

                client.Send(msg);
            }
        }
    }
}
