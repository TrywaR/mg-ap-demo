<?php
// Плагин для MODX Revo чтобы обрабатывать запросы со сторонних платформ
// Должно быть включено системное событие OnWebPageInit, если летит POST или GET c app разрешаем обработку
if( isset($_REQUEST['app']) && $_REQUEST['app'] == 'app' ){
  header('Access-Control-Allow-Origin: *');
  session_start();

  function authorization_check(){
    if ( !isset($_SESSION['session_key']) && !isset($_REQUEST['session_key']) ) {
      if ( $_REQUEST['session_key'] != $_SESSION['session_key'] ) {
        echo 'authorization_error';
        die();
      }
    }
  }

  if( isset($_REQUEST['form']) ) {
    switch ($_REQUEST['form']) {
      case 'authorization_form':
        if (!isset($_SESSION['session_key'])) $_SESSION['session_key'] = rand();
        echo $_SESSION['session_key'];
        break;

      default:
        break;
    }
  };

  if( isset($_REQUEST['profile']) ) {
    authorization_check();

    $oProfile = (object) [
      'id' => 1,
      'name' => 'ЕФИМОВА ВЕРОНИКА ВЛАДИМИРОВНА',
      'points' => 787,
      'progress' => 2.40
    ];
    echo json_encode($oProfile);
  };
}
