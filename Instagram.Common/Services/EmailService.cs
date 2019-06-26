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
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage
                {
                    From = new EmailAddress("support@myinstagram.com"),
                    Subject = message.Subject,
                    PlainTextContent = message.Body,
                };

                msg.AddTo(new EmailAddress(message.Destination));

               var response = await client.SendEmailAsync(msg);
        }
    }
}