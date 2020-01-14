// member_progress
function member_progress(){
  var lenght = $(document).find('.member_progress .step._yes').length
  if ( lenght > 0 )
    $(document)
      .find('.member_progress .step._yes')
        .each(function(index, elem){
          var height = 100
          if ( $(this).data().progress )
            height = $(this).data().progress

          $(this).find('._tree span:eq(1)').css({
            'height': height + '%',
            'transition-delay': index / lenght + 's'
        })
    })
}
// member_progress x

// member_search
function member_search(){

  $(document).on('change keyup input click', 'input.__search', function(){
    what = $(this).val().toLowerCase()

    $(document).find('.members .member').each(function(){
      if( $(this).find('._name').html().toLowerCase().indexOf( what ) >= 0 )
        $(this).show()
      else
        $(this).hide()
    })
  })
}
// member_search x
