// authorization
function authorization(){
  // Если пользователь авторизирован
  if ( session_key ) {
    active_buttons()
    content_upload('templates/profile.htm')
  }
  else {
    // console.log('start')
    active_buttons()
    content_upload('templates/authorizations/authorization.htm')
    // content_upload('https://alliance.paultik.ru/account/registration/')
  }
}
// authorization x

// authorization_message
function authorization_message(type,txt){
  type = type ? type : 0
  $(document).find('.authorization_forms .form_status').removeClass('_error')
  if ( type == 0 ) $(document).find('.authorization_forms .form_status').html('')

  // message
  if ( type == 0 ) $(document).find('.authorization_forms .form_status').html(txt)
  // error
  if ( type == 1 ) $(document).find('.authorization_forms .form_status').addClass('_error').html(txt)
}
// authorization_message x

$(function(){
  authorization()

  // authorization_form
  $(document).on('submit', '#authorization_form', function(){
    // - Получаем ключ сессии
    // - Параметры
    var
    // data = [], // Отправляемые данные
    result_text = '', // Текст о результате
    validate = 0 // Если есть ошибки

    // - demo
    login = true
    if ( $(this).find('[name=email]').val() != 'demo' ) login = false
    if ( $(this).find('[name=password]').val() != 'demo' ) login = false
    if ( login ) {
      localStorage.setItem('session_key', session_key = 'demo')
      authorization()
    }else{
      validate = 1
      result_text = 'Email или пароль введён не верно!'
      authorization_message(validate, result_text)
    }
    // - demo x

    // - site_login
    // -- add csrftoken
    // data = $(this).serializeArray()
    // data.push({
    //   name: 'csrftoken',
    //   value: csrftoken
    // })
    // data = $.param(data)
    //
    // $.ajax({
    //   url: site_url + 'account/login/',
    //   data: data,
    //   method: 'POST',
    //   // headers: {
    //   //   'X-CSRF-TOKEN': csrftoken
    //   // }
    // }).fail(function(data) {
    //   authorization_message(1, '<p style="color:#ff7f7f;">' + data.status + '<br/>' + data.statusText + '</p>')
    //
    // }).done(function(data) {
    //   authorization_message(1, '<p style="color:#ff7f7f;">' + data.status + '<br/>' + data.statusText + '</p>')
    //
    // })
    // - site_login x

    return false
  })
  // authorization_form х

  // registration_form
  $(document).on('submit', '#registration_form', function(data){
    // if ( $(this).find('[name=code]').val() ) {
    //   if ($(this).find('[name=code]').val() == 'demo' ) {
    //     content_upload('templates/authorizations/')
    //   }
    // }
    return false
  })
  // registration_form x

  // password_form
  $(document).on('submit', '#password_form', function(){
    return false
  })
  // password_form x

  // password-code_form
  $(document).on('submit', '#password-code_form', function(){
    return false
  })
  // password-code_form x

  // password-new_form
  $(document).on('submit', '#password-new_form', function(){
    return false
  })
  // password-new_form x

  // exit
  $(document).on('click', '#profile_exit', function() {
    localStorage.removeItem('session_key')
    session_key = ''
    authorization()
  })
  // exit x
})
