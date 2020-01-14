// trainer_trainer
function trainer_search(){
  $(document).on('change keyup input click', 'input.__search', function(){
    what = $(this).val().toLowerCase()

    $(document).find('.trainers .trainer').each(function(){
      if( $(this).find('._name').html().toLowerCase().indexOf( what ) >= 0 )
        $(this).show()
      else
        $(this).hide()
    })
  })
}
// trainer_trainer x
