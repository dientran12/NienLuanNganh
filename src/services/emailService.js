import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'atoan1752001@gmail.com',
    pass: 'xgkp oiua fjnb hchk',
  },
});


export const sendConfirmationEmail = async (userEmail) => {
  try {
    if (!userEmail) {
      console.error('Địa chỉ email không hợp lệ');
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Xác nhận đơn hàng',
      text: 'Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận.',
    };

    await transporter.sendMail(mailOptions);

    console.log('Đã gửi email xác nhận.');
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
  }
};
