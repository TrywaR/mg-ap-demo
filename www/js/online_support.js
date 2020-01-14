function support_init(){
  // Блок ввода
  support_active = $('#support_active')
  // Поле ввода
  support_input = $('#support_input')
  // Кнопка отправки
  support_button_send = $('#support_button_send')
  // Поле с сообщениями
  support_messages = $('#support_messages')
  // Страница чата
  page_support = support_messages.parents('.page_online_support')
  // Статус собеседника
  support_interlocutor_status = $('#support_interlocutor_status')

  // Ввод
  support_input.on('change keyup input click', function(){
    // Если что то введено показываем кнопку отправить
    if ( support_input.val().length > 0 )
      support_button_send.addClass('_active_')
    else
      support_button_send.removeClass('_active_')

    // Если введено много, увеличиваем поле
    if ( support_input.val().length > 10 )
      support_active.addClass('_full_height_')
    else
      support_active.removeClass('_full_height_')
  })

  support_input.focusout(function(){
    // Уменьшаем поле ввода если пользователь не вводит
    support_active.removeClass('_full_height_')
  })

  // Отправка
  support_button_send.on('click', function(){
    support_send()
  })
  support_input.on('keypress', function(e){
    if(e.ctrlKey && e.keyCode == 13){
      support_send()
      console.log('send')
    }
  })

  // Скроллито
  scroll_to(0, support_messages[0].scrollHeight)
}

// Чистка ввода пользователя
function support_text_clean(string){
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }

  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  })
}

// Отправка сообщений
function support_send() {
  if ( support_input.val().length > 0 ) {
    support_messages.append('<div class="message">'+support_text_clean(support_input.val())+'</div>')
    support_input.val('')
    support_button_send.removeClass('_active_')

    scroll_to(0, support_messages[0].scrollHeight)
    support_bot()
  }

  return false
}

// Бот с ответами
function support_bot(message){
  var
    answer = [],
    answer_time = Math.floor((Math.random() * 2000) + 500)
    support_interlocutor_input = Math.floor((Math.random() * 3000) + 1000)
    support_interlocutor_out = Math.floor((Math.random() * 10000) + 5000)
    support_interlocutor_online = Math.floor((Math.random() * 2000) + 500)

  answer.push(':)')
  answer.push('Хех')
  answer.push('Всегда рада помочь!)')
  answer.push('Как я могу помочь?')
  answer.push('Отлично!')
  answer.push('Это очень здорово!')
  answer.push('Хорошо!')
  answer.push('Если нужна помощь, я всегда рядом!')
  answer.push('Для меня нет сложных задач!')
  answer.push('На всё готова!')
  answer.push('Хочу помочь!')
  answer.push('Уже работаю над этим!')
  answer.push('Это звучит восхитительно!')
  answer.push('Да, это я могу')
  answer.push('Конечно!')
  answer.push('Если ещё нужна какая нибудь помощь, только напишите!')
  answer.push('(=')
  answer.push('Очень хочу помочь!')
  answer.push('(:')

  // Вход в онлайн
  support_bot_timer = setTimeout(
    function(){
      support_interlocutor_status.html('в сети')

      // Набор сообщения
      setTimeout(
        function(){
          support_interlocutor_status.html('набирает сообщение...')

          // Отправка ответа
          setTimeout(
            function(){
              support_messages.append('<div class="message __interlocutor">'+answer[Math.floor(Math.random() * 18)]+'</div>')
              support_interlocutor_status.html('в сети')
              scroll_to(0, support_messages[0].scrollHeight)

              // Оффлайн
              setTimeout(
                function(){
                  support_interlocutor_status.html('не в сети')
                }, support_interlocutor_out
              )
            }, answer_time
          )

        }, support_interlocutor_input
      )

    }, support_interlocutor_online
  )

}
