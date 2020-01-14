function course_init(){
  $(document).find('.them ._video ._prev').on('click', function(){
    console.log('video start')
    $(this).remove()
    $(this).addClass('_active_').siblings().removeClass('_active_')

    if ( $(this).next('video').length > 0 )
      $(this).next('video').trigger('play')

    if ( $(this).next('iframe').length > 0 )
      $(this).next('iframe').attr('src', $(this).next('iframe').attr('src') + "?autoplay=1")
  })
}
