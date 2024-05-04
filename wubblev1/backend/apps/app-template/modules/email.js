const StoreKnex = require("../services").get("knex1");
const { sendDynamicTemplate } = require("@es-labs/node/comms/email");
const { SENDGRID_DEFAULT_TEMPLATE, STOREFRONT } = global.CONFIG;

//Button css
//style="width:200px;display:inline-block;text-align:center;text-decoration:none;color:black;cursor:pointer;padding:5px 0px;border-radius:5px;border:1px solid #B7CAEF;background-color:#edf2fc;"

//Registration
const sendRegistrationSuccess = async (title, name, email, secret) => {
  try {
    // composing email body
    let subject = `${title}`;

    const emailGreeting = `<p>Dear ${name},\n\n</p>`;
    const emailText2 = `<p>Thank you for registering with Apex. Set up OTP by adding the cupher text to an authenticator app.</p>\n\n`;
    const emailText3 = `<p>Cipher: ${secret}</p>\n\n`;
    const emailClosing = "<p>Thank you.</p>\n\n";
    const emailText5 = `<p style="font-size: 12px">Disclaimer: This is your OTP secret key. Do not share this email with other people. </p>`;
    const message =
      emailGreeting + emailText2 + emailText3 + emailClosing + emailText5;

    let emailList = [{ email: email }];

    sendDynamicTemplate(
      emailList,
      "",
      "",
      subject,
      "",
      message,
      SENDGRID_DEFAULT_TEMPLATE
    );
  } catch (e) {
    console.log("error on sendAccountCreated", e);
  }
};

const sendResetPassword = async (title, name, email, link) => {
  try {
    let subject = `${title}`;
    const emailGreeting = `<p>Dear ${name},\n\n</p>`;
    const emailText2 = `<p>We have received a request to reset your password. Please click the link below to reset your password</p>\n\n`;
    const emailText3 = `<p><a href="${link}" target="_blank">${link}</a></p>\n\n`;
    const emailClosing = "<p>Thank you.</p>\n\n";

    const message = emailGreeting + emailText2 + emailText3 + emailClosing;

    let emailList = [{ email: email }];

    sendDynamicTemplate(
      emailList,
      "",
      "",
      subject,
      "",
      message,
      SENDGRID_DEFAULT_TEMPLATE
    );
  } catch (e) {
    console.log("error on request reset password email", e);
  }
};

const sendEmail = async (sender, recipient, message) => {
  try {
    let subject = 'Customer Enquiry';

    let msgSplitted;

    let result = '';

    if (message) {
      msgSplitted = message.split(/\r?\n/)
      msgSplitted.map(item => {
        const addTag = `<p>${item}</p>\n`

        result = result + addTag
        return true
      })
    }

    let emailList = [{ email: recipient }];

    const send = await sendDynamicTemplate(
      emailList,
      "",
      sender,
      subject,
      "",
      result,
      SENDGRID_DEFAULT_TEMPLATE
    );

    return send
  } catch (e) {
    console.log("error on request send email", e);
    return false
  }
};

module.exports = {
  sendRegistrationSuccess,
  sendResetPassword,
  sendEmail
};
