// chat_search
function chat_search(){
  $(document).on('change keyup input click', 'input.__search', function(){
    var
      what = $(this).val().toLowerCase()
      border = true

    if ( what.length > 0 ) {
      $(document).find('.chats .chat').each(function(){
        if( $(this).find('._name').html().toLowerCase().indexOf( what ) >= 0 ){
          $(this).removeClass('_hide_')
          if ( border ) {
            $(this).addClass('_no_border_')
            border = false
          }
        }
        else
          $(this).addClass('_hide_')

        $(document).find('.chats .sort_item').addClass('_hide_')
      })
    }
    else{
      $(document).find('.chats .chat').removeClass('_hide_')
      $(document).find('.chats .chat').removeClass('_no_border_')
      $(document).find('.chats .sort_item').removeClass('_hide_')
    }
  })
}
// chat_search x

// chat_edit
function chat_edit(){
  $(document).on('change', '.chats .chat input[name="del"]', function(){
    var show_chat_edit = false

    $(document).find('.chats .chat input[name="del"]').each(function(){
      if ( $(this).prop('checked') )
        show_chat_edit = true
    })

    if ( show_chat_edit )
      $(document).find('#chat_edit').addClass('_active_')
    else
      $(document).find('#chat_edit').removeClass('_active_')
  })

  $(document).on('click', '#chat_del', function(){
    console.log('start')
    $(document).find('.chats .chat input[name="del"]').each(function(){
      console.log('check')
      if ( $(this).prop('checked') )
        $(this).parents('.chat').remove()
      console.log('del')
    })
    console.log('hide')

    $(document).find('#chat_edit').removeClass('_active_')
  })
}
// chat_edit x
