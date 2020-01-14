function chat_init(){
  // Блок ввода
  chat_active = $('#chat_active')
  // Поле ввода
  chat_input = $('#chat_input')
  // Кнопка отправки
  chat_button_send = $('#chat_button_send')
  // Поле с сообщениями
  chat_messages = $('#chat_messages')
  // Страница чата
  page_chat = chat_messages.parents('.page_chat')
  // Статус собеседника
  interlocutor_status = $('#interlocutor_status')

  // Ввод
  chat_input.on('change keyup input click', function(){
    // Если что то введено показываем кнопку отправить
    if ( chat_input.val().length > 0 )
      chat_button_send.addClass('_active_')
    else
      chat_button_send.removeClass('_active_')

    // Если введено много, увеличиваем поле
    if ( chat_input.val().length > 10 )
      chat_active.addClass('_full_height_')
    else
      chat_active.removeClass('_full_height_')
  })

  chat_input.focusout(function(){
    // Уменьшаем поле ввода если пользователь не вводит
    chat_active.removeClass('_full_height_')
  })

  // Отправка
  chat_button_send.on('click', function(){
    chat_send()
  })
  chat_input.on('keypress', function(e){
    if(e.ctrlKey && e.keyCode == 13){
      chat_send()
      console.log('send')
    }
  })

  // Скроллито
  scroll_to(0, chat_messages[0].scrollHeight)
}

// Чистка ввода пользователя
function chat_text_clean(string){
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
function chat_send() {
  if ( chat_input.val().length > 0 ) {
    chat_messages.append('<div class="message">'+chat_text_clean(chat_input.val())+'</div>')
    chat_input.val('')
    chat_button_send.removeClass('_active_')

    scroll_to(0, chat_messages[0].scrollHeight)
    chat_bot()
  }

  return false
}

// Бот с ответами
function chat_bot(message){
  var
    answer = [],
    answer_time = Math.floor((Math.random() * 2000) + 500)
    interlocutor_input = Math.floor((Math.random() * 3000) + 1000)
    interlocutor_out = Math.floor((Math.random() * 8000) + 1000)
    interlocutor_online = Math.floor((Math.random() * 5000) + 1000)

  answer.push(':(')
  answer.push('Хех')
  answer.push('А я тебе про что?)')
  answer.push('Я подумаю')
  answer.push('Я тебя поняла.')
  answer.push('Ага, понятно...')
  answer.push(':D')
  answer.push('А ещё чего?')
  answer.push('Не ну это не смешно..')
  answer.push('Не сегодня')
  answer.push('Давай завтра')
  answer.push('...')
  answer.push('Напиши чего по лучше')
  answer.push('Ну ты даёшь')
  answer.push('Ну да, ну да')
  answer.push('Без тебя справлюсь!')
  answer.push('Отстань.')
  answer.push('Я не хочу тебе писать')
  answer.push('):')

  // Вход в онлайн
  chat_bot_timer = setTimeout(
    function(){
      interlocutor_status.html('в сети')

      // Набор сообщения
      setTimeout(
        function(){
          interlocutor_status.html('набирает сообщение...')

          // Отправка ответа
          setTimeout(
            function(){
              chat_messages.append('<div class="message __interlocutor">'+answer[Math.floor(Math.random() * 18)]+'</div>')
              interlocutor_status.html('в сети')
              scroll_to(0, chat_messages[0].scrollHeight)

              // Оффлайн
              setTimeout(
                function(){
                  interlocutor_status.html('не в сети')
                }, interlocutor_out
              )
            }, answer_time
          )

        }, interlocutor_input
      )

    }, interlocutor_online
  )

}
