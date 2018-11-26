$(document).ready(function() {
  $('#제출').click(function () {
    var 원래_입력 = $('#프레임').contents().find('#입력').val();
    var 원래_출력 = $('#프레임').contents().find('#출력').html();

    for(var i = 0; i < 채점_수; i++) {
      $('#프레임').contents().find('#입력').val(채점_데이터[i]);
      $('#프레임').contents().find('#컴파일').trigger('click');
      $('#프레임').contents().find('#실행').trigger('click');

      채점_결과[i] = ( $('#프레임').contents().find('#출력').text() == 채점_데이터_결과[i] );
    }
    $('#프레임').contents().find('#입력').val(원래_입력);
    $('#프레임').contents().find('#출력').html(원래_출력);

    console.log(채점_결과);
    window.open("./채점_팝업.html","채점 결과",'width=500, height=500');
  });
});
