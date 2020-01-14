function profile_edit_init(){
  // - Подстановка данных
  // -- Имя
  $(document)
  .find('#input_name')
  .val( localStorage.getItem('user_name') )

  // -- Фамилия
  $(document)
  .find('#input_last_name')
  .val( localStorage.getItem('user_last_name') )

  // - Изменение данных
  $(document)
  .find('#profile_info_save')
  .on ('click', function(){
    console.log('change')
    if ( $(document).find('#input_name').val() != localStorage.getItem('user_name') )
    localStorage.setItem('user_name', $(document).find('#input_name').val())

    if ( $(document).find('#input_last_name').val() != localStorage.getItem('user_last_name') )
    localStorage.setItem('user_last_name', $(document).find('#input_last_name').val())

    return false
  })
}

$(function(){
  $(document).on('change', '#profile_img', function(){
    $(this).next('._name').html(this.files[0].name)
  })
})
