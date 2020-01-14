// params
page_url = '' // Адрес текущей страницы
site_url = 'https://alliance.paultik.ru/' // Адрес сайта
// site_url = 'http://m97731yi.beget.tech/' // Адрес сайта
pages_history = [] // История страниц
pages_history_length = 2 // Количество страниц в истории
// test@trywar.ru
// SZ0wSgL2
session_key = '' // Ключ авторизации
csrftoken = '' // csrftoken
ajax_salt = {
  'app': 'app'
}  // Необходимые параметры для ajax
// params x

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
// function getCookie(name) {
//   var matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

// CSRF
// function send_reply(){
//   echo json_encode(array('reply'=>'here is my reply'));
//   exit;
// }

// $(function(){
//   $.ajax({
//     url:'https://alliance.paultik.ru/account/login/',
//     data:{'func':'send_reply'},
//     type:'POST',
//     dateType:'json'
//   }).success(function(data){
//     data=$.parseJSON(data);
//     alert(data.reply);
//   }).error(function(jqxhr,error,status){
//     alert('Error sending reply');
//   });
// })

// function CSRF(){
//   $.ajax({
//     type: 'GET',
//     url: site_url,
//     data: 'test',
//     success: function(data, textStatus, request) {
//       console.log(textStatus)
//       console.log(request)
//       // alert(request.getResponseHeader('Set-Cookie'))
//     },
//   })
//   // $.get(site_url, function(data, textStatus, request){
//   //   alert(request.getResponseHeader('Set-Cookie'));
//   //   // console.log(data.status)
//   // //   var data = $('<div/>').html(data)
//   // //   var test = $(data).find('body').length > 0 ? $(data).find('body').html() : ''
//   // //   // console.log(data)
//   // //   // console.log(test)
//   // //   // console.log('stest')
//   // //   // stest = getCookie('csrftoken')
//   // //   // console.log(stest)
//   // //   // alert( document.cookie );
//   // //    alert(data.reply);
//   // })
// }
// CSRF()
// CSRF x

// LocalSWtorage
// Сессия для логирования
if ( localStorage.getItem('session_key') ) {
  session_key = localStorage.getItem('session_key')
  ajax_salt['session_key'] = session_key
}

// Баллы пользователя
user_points = 750
if ( localStorage.getItem('user_points') )
  user_points = localStorage.getItem('user_points')
else
  localStorage.setItem('user_points', user_points)
// LocalStorage x

// num2str
function num2str(n, text_forms) {
  var
    n1 = n % 10,
    n = Math.abs(n) % 100

  if (n > 10 && n < 20)
    return text_forms[2]
  if (n1 > 1 && n1 < 5)
    return text_forms[1]
  if (n1 == 1)
    return text_forms[0]

  return text_forms[2]
}
// num2str(1, ['минута', 'минуты', 'минут'])
// num2str

// active_buttons
function active_buttons(show){
  if ( show != false )
    show = true

  if ( localStorage.getItem('session_key') && show ) {
    $('body > header').show()
    $('body > footer').show()
  }
  else{
    $('body > header').hide()
    $('body > footer').hide()
  }
}
// active_buttons

// scroll_to
function scroll_to(elem, fix_size, scroll_time){
  scroll_val = elem ? elem.offset().top : 0
  scroll_val = fix_size ? fix_size : scroll_val
  scroll_time = scroll_time != null ? scroll_time : 500

  $(document).find('html,body').animate({
    scrollTop: scroll_val
  }, scroll_time)
}
// scroll_to x

// page_prev
function page_prev(href, data){
  // href - Шаблон предыдущей страницы
  // data - Данные предыдущей страницы

  if ( href ) {
    // Проверяем урвоень вложенности
    arrInner = href.split('/')

    // Если вложенная то добавляем в историю
    if ( arrInner.length > 2 ) {
      // Если больше 1 в истории, ввыодим кнопку назад
      if ( pages_history.length > 1 ) {
        // Пишем историю
        pages_history.push( href )

        // Если в истории больше чем нужно, обрезаем историю
        if ( pages_history.length >= pages_history_length ) {
          // Обрезаем массив
          pages_history = pages_history.slice(pages_history_length * - 1)
          // Выводим кнопку
          $(document).find('#main_menu_back').addClass('_active_')
        }
      }
      // Если нет
      else {
        // Если 1, то добавляем ссылочку и скрываем кнопку
        if ( pages_history.length == 1 ) {
          // Добавляем в массив
          pages_history.push( href )
          // Скрываем кнопку
          $(document).find('#main_menu_back').addClass('_active_')
        }
      }
    }
    // Если нет удаляеи из истории
    else {
      // Чистим историю
      pages_history = []
      // Скрываем кнопку назад
      $(document).find('#main_menu_back').removeClass('_active_')
    }

    // Если массив пустой но ссылка есть, добавляем ссыль в историю
    if ( pages_history.length == 0 && href.length > 0 ) {
      pages_history.push( href )
      // Скрываем кнопку
      $(document).find('#main_menu_back').removeClass('_active_')
    }
  }
  else{
    pages_history = []
    // Скрываем кнопку
    $(document).find('#main_menu_back').removeClass('_active_')
  }
}
// page_prev x

// template_parse
function template_parse(data, template_url){
  var data = $('<div/>').html(data)
  var header = $(data).find('header').length > 0 ? $(data).find('header').html() : ''
  var main = $(data).find('main').length > 0 ? $(data).find('main').html() : ''
  var main_class = $(data).find('main').length > 0 ? $(data).find('main').attr('class') : ''
  var footer = $(data).find('footer').length > 0 ? $(data).find('footer').html() : ''

  $(document).find('body header .block_header_items').html(header)
  $(document).find('body main').html(main).attr('class', '')
  $(document).find('body main').addClass(main_class)
  $(document).find('body footer').html(footer)

  content_parse(data, template_url)

  // // parse
  // $.each(data, function(key, value){
  //   $(template_htm).find('main [data-key='+key+']').prepend(value)
  // })

  $(document).find('#main_menu li.' + main_class).addClass('_active_').siblings().removeClass('_active_')
}
// template_parse x

// content_parse
function content_parse(data, template){
  var
  arrTemplate = template.split('/'),
  sTemplatesPath = arrTemplate[arrTemplate.length - 1],
  sTemplatePath = sTemplatesPath + '/item.htm',
  sTemplateName = sTemplatesPath.substr(0, sTemplatesPath.length - 4),
  sDataPath = '',
  oJsonData = '',
  templateHtml = $('<div/>').html($.post(sTemplatePath)),
  contentHtml = ''

  for (var i = 0; i < arrTemplate.length; i++)
  if ( i === arrTemplate.length - 1 ) sDataPath += sTemplateName + '.json'
  else sDataPath += arrTemplate[i] + '/'

  $.post(sDataPath, function(sData){
    oJsonData = $.parseJSON(sData)
  })

  $.each(oJsonData.items, function(index, item){
    $.each(item, function(key, value){
      if ( $(templateHtml).find('[data-key='+key+']').length > 0 )
      $(templateHtml).find('[data-key='+key+']').prepend(value)
    })
    contentHtml += templateHtml
  })

  return contentHtml
}
// content_parse x

// content_upload
function content_upload(upload_url){
  $('body').addClass('_load_')

  console.log('content_upload: ' + upload_url)
  console.log(upload_url.indexOf('http'))
  if (upload_url.indexOf('http') >= 0) {
    console.log('С сайта')

    $.ajax({
      url: upload_url,
      data: $(this).serialize(),
      xhrFields: {
        withCredentials: false
      }
    }).done(function(data) {
      $(document).find('body').html(data)
      scroll_to(0,0,0)
      page_prev(upload_url)
      $('body').removeClass('_load_')
    })
  }
  else{
    console.log('С приложения')

    $.post(upload_url, function(data){
      template_parse(data, upload_url)
      scroll_to(0,0,0)
      page_prev(upload_url)
      $('body').removeClass('_load_')
    })
  }


  return false
}
// content_upload х

$(function(){

  // csrftoken
  // $.get(site_url + 'account/login/', {'func':'send_reply'}, function(data){
  //   var oData = $('<div/>').html(data)
  //   csrftoken = oData.find('[name="csrfmiddlewaretoken"]').val()
  //   console.log(csrftoken)
  // })
  // csrftoken x

  // fix_size
  $(document)
    .find('main')
      .height(
        $(document).height() - $(document).find('header').height()
      ).css({
        'padding-top': $(document).find('header').height() + 'px'
      })
  // fix_size x

  // page_prev
  $(document).on('click', '#main_menu_back', function(){
    if (pages_history.length) {
      content_upload(pages_history[pages_history.length - pages_history_length])
      page_prev()
      $(document).find('#main_menu_back').removeClass('_active_')
    }
    else {
      console.log('ne ok 2')
    }
  })
  // page_prev x

  // content_upload
  $(document).on('click', '.content_upload', function(){
    page_url = $(this).attr('href')

    if ( $(this).data('content') ) {

      if ( $(this).data('params') ) {
        content_upload(page_url, $(this).data('content'), $(this).data('params'))
      }else{
        content_upload(page_url, $(this).data('content'))
      }

    }else{
      content_upload(page_url)
    }

    $('#main_menu_show').removeClass('_active_')
    $('#main_menu').removeClass('_active_')
    $('body').removeClass('_no_active_')

    return false
  })
  // content_upload x

  // main_menu
  $(document).on('click', '#main_menu_show', function(){
    $(this).toggleClass('_active_')
    $('#main_menu').toggleClass('_active_')
    $('body').toggleClass('_no_active_')

    return false
  })
  $(document).on('click', '#main_menu li a', function(){
    $(this).parents('li').addClass('_active_').siblings().removeClass('_active_')
    $('#main_menu_show').removeClass('_active_')
    $('#main_menu').removeClass('_active_')
    $('body').removeClass('_no_active_')

    return false
  })
  // main_menu x
})
