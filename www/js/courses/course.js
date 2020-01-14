function course_init(){
  // point saver
  $(document)
  .find('.them')
  .each(function(){
    var
    video = $(this).find('._video video'),
    video_src = video.find('source').attr('src'),
    oVideo = video[0]

    oVideo.onplaying = function(){
      VideoTimer = setTimeout(function () {
        if ( ! localStorage.getItem( video_src ) )
        localStorage.setItem( 'user_points', parseInt( localStorage.getItem( 'user_points' ) ) + 10 )
        localStorage.setItem( video_src , true )
      }, 1000);
    }
  })

  // decoration
  $(document).find('.them ._video ._prev').on('click', function(){

    $(this).addClass('_active_').siblings().removeClass('_active_')

    if ( $(this).next('video').length > 0 )
      $(this).next('video').trigger('play')

    if ( $(this).next('iframe').length > 0 )
      $(this).next('iframe').attr('src', $(this).next('iframe').attr('src') + "?autoplay=1")
  })
}
