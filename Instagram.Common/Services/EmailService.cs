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
            using (var smtp = new SmtpClient())
            {
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;

                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("uladzislauzhauniak@gmail.com", "Delovayakolbasa1");

                var mail = new MailMessage()
                {
                    Body = message.Body,
                    From = new MailAddress("support@myinst.com"),
                    Subject = message.Subject,
                    IsBodyHtml = true,
                    To = { message.Destination }
                };

                smtp.Send(mail);
            }
        }
    }
}