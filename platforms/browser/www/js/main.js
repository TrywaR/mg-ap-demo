$(function(){
  // main_menu
  $(document).on('click', '#main_menu_show', function(){
    $(this).toggleClass('_active_')
    $('#main_menu').toggleClass('_active_')
    $('body').toggleClass('_no_active_')
  })
  // main_menu x

  // upload_content
  $(document).on('click', '.content_upload', function(){
    console.log('start')

    if ($(this).attr('href').indexOf('http') >= 0) {
      console.log('С сайта')
      $.post($(this).attr('href'), function(data){
        // this_data = data
        $('main').html(data)
      })

    }
    else{
      console.log('С приложения')
      $.post($(this).attr('href'), function(data){
        $('main').html(data)
      })
    }

    console.log('stop')
    $('#main_menu_show').click()
    
    return false
  })
  // upload_content x
})
