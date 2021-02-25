import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

class SendEmailServices {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transpoter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transpoter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    // const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs"); Get the path of the file hbs
    // const templateFileContent = fs.readFileSync(npsPath).toString("utf8"); Read the file hbs

    const templateFileContent = fs.readFileSync(path).toString("utf8");

    const mailTemplateParse = handlebars.compile(templateFileContent); // Compile the file hbs

    const html = mailTemplateParse(variables); //Parse the variables to the value that we want to.

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "NPS <noreply@nps.ie>",
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendEmailServices();
