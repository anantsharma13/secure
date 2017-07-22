<?php
$localIP= gethostbyname($_SERVER['HTTP_HOST']);;
$reply=array('status'=> null);
$msg=$_POST['msg'];
$user=$_POST['user'];
if (empty($msg) || empty($user)){
    $reply['status']='null';
    echo json_encode($reply);
    die();
}
$msg = trim(preg_replace('/\s+/', ' ', $msg));
$msg_str=explode(' ',$msg);
$str=array('marijuana','Marijuana','heroin','cocaine','methamphetamines','terror','kill','goon','Heroin','Cocaine','Methamphetamines','Terror','Kill','Goon');
foreach($msg_str as $key => $value){

    foreach($str as $k => $v) {

        if($value==$v){
            $reply['status']='Block';
            $reply['IP']=$localIP;
            echo json_encode($reply);
            die();
        }

    }
}
$reply['status']='Success';
$reply['message']=$msg;
$reply['user']=$user;
echo json_encode($reply);
die();


?>