$(function(){
  // collaps_block
  $(document).on('click', '.collaps_block .collaps_btn a', function(){
    $(this)
      .parents('.collaps_block').toggleClass('_active_')
      
    return false
  })
  // collaps_block x
})
