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

    // - demo
    localStorage.setItem('session_key', session_key = 'demo')
    localStorage.setItem('user_name', $(this).find('[name=name]').val() )
    localStorage.setItem('user_last_name', $(this).find('[name=last_name]').val() )
    authorization()
    // - demo x

    return false
  })
  // authorization_form х

  // exit
  $(document).on('click', '#profile_exit', function() {
    localStorage.removeItem('session_key')
    session_key = ''
    authorization()
  })
  // exit x
})
