function support_init(){
  // form_support
  $(document).find('#form_support').on('submit', function(){

    $.ajax({
      url: '/app/app.php',
      method: 'POST',
      data: $(this).serialize()+'&form_support=form_support&app=app',
      xhrFields: {
        withCredentials: false
      }
    }).done(function(data) {
      $(document).find('#form_support').html('Сообщение успешно отправленно')
    })

    return false
  })
  // form_support x
}
