// password-new_form
$(function(){
  $(document).on('submit', '#password-new_form', function(){
    localStorage.setItem('session_key', session_key = 'demo')
    authorization()

    return false
  })
})
// password-new_form x
