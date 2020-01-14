// test_complit
function test_complit(tests){
  // Скрываем активные кнопки
  active_buttons(false)

  var
    test_success = 0 // Количество правильных ответов
    test_points = 0 // Количество баллов

  // Перебираем вопросы
  tests.find('.test').each(function(){
    // Если ответ правильный
    if ( $(this).data().valid ){
      // Засчитываем его
      test_success++

      // Считаем количество балов
      // if ( $(this).data().points )
      //   test_points += parseInt( $(this).data().points )
    }
  })

  // Делаем круг с результатом в процентах
  var
    divs = tests.next('.result').find('._circle ._items span')
    delta = Math.PI * 2 / divs.length;
    x = 0, y = 0, angle = 0;
    rotate = 0
    deg = 360 / divs.length

  $.each(divs, function(index, elem){
    $(this).css({
      'left': 100 * Math.cos(angle) + 'px',
      'top': 100 * Math.sin(angle) + 'px',
      'transform': 'rotate('+ rotate +'deg)',
      'transition': '.3s ease ' + index / divs.length + 's',
    })

    rotate += deg.toFixed(2) * 1
    angle += delta;
  })

  // Вывод количества правильных ответов
  // tests
  //   .next('.result')
  //     .find('._circle ._data ._test_success_count span')
  //       .html( test_success + ' / ' + tests.find('.test').length )
  //
  // // Вывод баллов
  // tests
  //   .next('.result')
  //     .find('._circle ._data ._points span')
  //       .html(
  //         test_points + ' ' + num2str(test_points, ['Балла', 'Балла', 'Баллов'])
  //       )

  // Сохраняем результат
  user_points = parseInt( localStorage.getItem('user_points') )
  localStorage.setItem('user_points', user_points + test_points)

  // Показываем результат
  tests
    .next('.result')
      .addClass('_active_')

  // Если есть правильные ответы, делаем анимацию круга
  if ( test_success ) {
    // Расчитываем процент правильных ответов
    test_success_precent = ( 100 * test_success ) / tests.find('.test').length
    // Вывод процента правильных ответов
    tests
      .next('.result')
        .find('._circle ._data ._test_success_percent span')
          .html( test_success_precent )

    test_success_precent = divs.length * ( test_success_precent / 100 )

    // Закрашиваем в кругу нужное количество элементов
    setTimeout(function(){
      $.each(divs, function(index, elem){
        if ( index <= test_success_precent )
        $(this).addClass('_active_')
      })
    }, 500)
  }


  return false
}
// test_complit x

// test_init
function test_init(){
  // Показываем кнопки активности после выполнения теста
  $(document).on('click', '._test_end_', function(){
    active_buttons()
  })

  // Проверка теста
  $(document).on('click', '._test_check_', function(){
    var test = $(this).parents('.test') // Блок текущего теста

    // Проверяем что есть какой то ответ
    if ( ! test.find('input:checked').length > 0 )
      return false

    test.data('valid', true) // Сразу думаем что ответ верен
    test.data('points', 0) // 0 балов сразу

    // Перебираем варианты ответов на вопрос
    test.find('input').each(function(){
      // Если возможен 1 вариант ответа
      if ( $(this).attr('type') == 'radio' )
        // Находим выбранный
        if ( $(this).prop('checked') )
          // Если он правильный, добавляем баллы
          if ( $(this).data().true )
            test
              .data('points', parseInt( $(this).data().points ))
          // Если не правильный, провал
          else
            test.data('valid', false)

      // Если возможно несколько вариантов ответа
      if ( $(this).attr('type') == 'checkbox' )
        // Если правильный вариант ответа
        if ( $(this).prop('checked') )
          // И йузер выбрал его
          if ( $(this).data().true )
            // Добавляем очки
            test.data('points',
              parseInt( test.data('points') )
              +
              parseInt( $(this).data().points )
            )
          // Если йузер выбрал не правильный ответ
          else
            // Провал
            test.data('valid', false)
    })

    // Переход на следующий вопрос
    test.removeClass('_active_')
    // Если есть следующий тест
    if ( test.next('.test').length > 0 )
      test.next('.test').addClass('_active_')
    //Если нет пока результата
    else
      test_complit(test.parents('.tests'))

    return false
  })
}
// test_init x
