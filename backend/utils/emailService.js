const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📧 Email would be sent to: ${to} | Subject: ${subject}`);
      return { success: true, preview: true };
    }
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"Finance Paisa" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error.message);
    return { success: false, error: error.message };
  }
};

const sendOtpEmail = async ({ email, name, otp }) => {
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
      <div style="background: linear-gradient(135deg, #0f172a, #4f46e5); padding: 28px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #fff; margin: 0; font-size: 26px;">Finance Paisa</h1>
        <p style="color: rgba(255,255,255,0.75); margin-top: 8px;">Secure account verification</p>
      </div>
      <div style="background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
        <p style="color: #334155; margin-top: 0;">Hi ${name || 'there'},</p>
        <p style="color: #475569;">Use the OTP below to verify your Finance Paisa account:</p>
        <div style="margin: 22px 0; text-align: center;">
          <span style="display: inline-block; letter-spacing: 10px; font-size: 32px; font-weight: 800; color: #4f46e5; background: #eef2ff; padding: 12px 20px; border-radius: 10px;">${otp}</span>
        </div>
        <p style="color: #64748b; margin-bottom: 0;">This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Your Finance Paisa OTP',
    html,
  });
};

const sendApplicationStatusEmail = async (user, application) => {
  const statusMessages = {
    approved: { subject: '🎉 Loan Application Approved!', color: '#22c55e', message: 'Great news! Your loan application has been approved.' },
    rejected: { subject: 'Update on Your Loan Application', color: '#ef4444', message: 'Unfortunately, your loan application could not be processed at this time.' },
    under_review: { subject: '🔍 Application Under Review', color: '#f59e0b', message: 'Your application is currently being reviewed by our team.' },
    disbursed: { subject: '💰 Loan Disbursed!', color: '#6366f1', message: 'Your loan amount has been disbursed to your account.' }
  };
  const statusInfo = statusMessages[application.status] || statusMessages.under_review;
  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
      <div style="background: linear-gradient(135deg, #0f172a, #4f46e5); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Finance Paisa</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Your Trusted Financial Partner</p>
      </div>
      <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="color: ${statusInfo.color}; margin-top: 0;">${statusInfo.subject}</h2>
        <p style="color: #475569;">Dear ${user.name},</p>
        <p style="color: #475569;">${statusInfo.message}</p>
        <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 4px 0; color: #334155;"><strong>Application #:</strong> ${application.applicationNumber}</p>
          <p style="margin: 4px 0; color: #334155;"><strong>Loan Type:</strong> ${application.loanRequirements?.loanType}</p>
          <p style="margin: 4px 0; color: #334155;"><strong>Amount:</strong> ₹${application.loanRequirements?.loanAmount?.toLocaleString('en-IN')}</p>
          <p style="margin: 4px 0; color: ${statusInfo.color};"><strong>Status:</strong> ${application.status.toUpperCase()}</p>
        </div>
        <p style="color: #94a3b8; font-size: 14px;">Login to your Finance Paisa dashboard to view more details.</p>
      </div>
    </div>`;
  return sendEmail({ to: user.email, subject: statusInfo.subject, html });
};

const sendPartnerRequestEmail = async (partner) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  const subject = `New Partner Request: ${partner.companyName}`;
  const html = `
    <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 20px; background: #f8fafc;">
      <div style="background: #2563EB; color: #fff; padding: 20px;">
        <h2 style="margin: 0; font-size: 24px;">New Partnership Request</h2>
      </div>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 20px;">
        <p style="margin-top: 0; color: #0f172a;">A new partner application has been received.</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Full Name</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${partner.fullName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Company</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${partner.companyName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${partner.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${partner.phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Business Type</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${partner.businessType}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Experience</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${partner.yearsOfExperience} years</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">City</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${partner.city}</td></tr>
          <tr><td style="padding: 8px; color: #6b7280;">Message</td><td style="padding: 8px; color: #0f172a;">${partner.message || 'N/A'}</td></tr>
        </table>
      </div>
    </div>
  `;
  return sendEmail({ to: adminEmail, subject, html });
};

const sendEnquiryEmail = async (enquiry) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  const subject = `New Contact Enquiry: ${enquiry.subject}`;
  const html = `
    <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 20px; background: #f8fafc;">
      <div style="background: #2563EB; color: #fff; padding: 20px;">
        <h2 style="margin: 0; font-size: 24px;">New Contact Enquiry</h2>
      </div>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 20px;">
        <p style="margin-top: 0; color: #0f172a;">A new enquiry has been submitted.</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Full Name</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${enquiry.fullName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${enquiry.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${enquiry.phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Subject</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #0f172a;">${enquiry.subject}</td></tr>
          <tr><td style="padding: 8px; color: #6b7280;">Message</td><td style="padding: 8px; color: #0f172a;">${enquiry.message}</td></tr>
        </table>
      </div>
    </div>
  `;
  return sendEmail({ to: adminEmail, subject, html });
};

module.exports = { sendEmail, sendOtpEmail, sendApplicationStatusEmail, sendPartnerRequestEmail, sendEnquiryEmail };
