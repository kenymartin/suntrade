import Mail, { Attachment } from "nodemailer/lib/mailer";

interface IEmailoptions extends Mail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html:string;
    attachments:Mail.Attachment[];
    hasAttachments:()=>boolean
  }
  export default IEmailoptions