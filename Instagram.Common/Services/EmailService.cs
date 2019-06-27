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

                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("uladzislauzhauniak@gmail.com", "Delovayakolbasa0");
                client.EnableSsl = true;

                var msg = new MailMessage()
                {
                    Body = message.Body,
                    Subject = message.Subject,
                    IsBodyHtml = true,
                    From = new MailAddress("uladzislauzhauniak@gmail.com")
                };

                msg.To.Add(message.Destination);

                client.Send(msg);
            }
        }
    }
}