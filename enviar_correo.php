<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->SMTPDebug=0;
    $mail->Host='smtp.gmail.com';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
    $mail->Port = 587;
    
    $mail->SMTPAuth=true;
    $email='sanchezvera490@gmail.com';
    $mail->Username=$email;
    $mail->Password="pwyj tkss bwuv xwlb";
    $mail->setFrom($email, 'Notaria 16 Tezontepec');
    $mail->addReplyto('sanchezvera490@gmail.com','Notaria 16 Tezontepec');
    $mail->addAddress($correo, 'Notaria 16 Tezontepec');
    $mail->Subject='Nuevo mensaje de contacto de usuario pagina web';
    $mail->isHTML(true);
    $mail->CharSet='UTF-8';
    $mail->Body = '
    <html>
    <body style="background-color: #F5F5DC; margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #FFF; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    
        <h1 style="color: #8B4513; text-align: center;"> ¡Nuevo usuario nos contacto! </h1>
        <img src="cid:logo" style="width: 15%; max-width: 100px; display: block; margin: 0 auto;">
        <p style="color: #333;">NOMBRE:<strong>'.$_POST['nombre'].'<br>CORREO:<strong>'.$_POST['correo'].'<br>ASUNTO:<strong>'.$_POST['asunto'].'<br></strong>MENSAJE:<strong>'.$_POST['mensaje'].'<br></p>
        <footer style="background-color: #DFDFDF; margin-top: 20px; text-align: center; color: #555;">© Notaria 16 Tezontepec. Todos los derechos recervados</footer>
    </div>
    </body>
    </html>
    ';
    $mail->AddEmbeddedImage('../img/LOGO NOTARIA16.jpg', 'logo', 'notaria');
    
    
    $mail->send();
    header('Location:../index.html');

    } catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    
    echo 'enviado mal';
    
    header('Location:../index.html');
    }?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <H1>SSSSSSSS</H1>
    </body>
    </html>