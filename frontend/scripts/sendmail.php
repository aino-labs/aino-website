<?php

require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USER'];
    $mail->Password = $_ENV['SMTP_PASS'];
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom($_ENV['SMTP_USER'], $_ENV['SMTP_FROM_NAME']);
    $mail->addAddress($_ENV['SMTP_USER']);

    $mail->CharSet = 'UTF-8';
    $mail->isHTML(true);

    $body = '';
    if(!empty(trim($_POST['name']))) {
        $body .= "<p>Имя: <strong>". htmlspecialchars($_POST['name']) ."</strong></p>";
    }
    if(!empty(trim($_POST['contact']))) {
        $body .= "<p>Контакты для связи: <strong>". htmlspecialchars($_POST['contact']) ."</strong></p>";
    }

    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body    = $body;

    $mail->send();
    echo 'OK';

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
