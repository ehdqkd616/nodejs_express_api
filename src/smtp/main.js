const nodemailer = require('nodemailer');

const smtpServerURL = 'smtp.mail.nate.com'// "email SMTP 서버 주소"
const authUser = 'ehdqkd616@nate.com' // "email 계정 아이디 또는 이메일"
const authPass = 'roqkfrudy2@' // "email 계정 비밀번호"
const fromEmail = 'ehdqkd616@nate.com' // '보내는 사람 이메일 주소'

function sendEmail(toEmail, title, txt) {    
    let transporter = nodemailer.createTransport({
        service: 'nate',
        host: smtpServerURL,    //SMTP 서버 주소
        port: 465,
        secure: true,           //보안 서버 사용 false로 적용시 port 옵션 추가 필요
        auth: {
            user: authUser,     //메일서버 계정
            pass: authPass      //메일서버 비번
        }
    });
    
    let mailOptions = {
        from: fromEmail,        //보내는 사람 주소
        to: toEmail ,           //받는 사람 주소
        subject: title,         //제목
        text: txt               //본문
    };

    //전송 시작!
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            //에러
            console.log(error);
        }
        //전송 완료
        console.log("Finish sending email : " + info.response);        
        transporter.close()
    })
}

// console.log('테스트');

sendEmail('ehdqkd616@nate.com', '테스트 메일 발송', '테스트 메일');