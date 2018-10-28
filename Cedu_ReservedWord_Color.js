function reservedWord_color(user_code) {

  var word_list_blue = ["만약", "그렇지않으면", "그렇지않다면", "반복"];
  var word_list_purple = ["변수", "함수"];
  var word_list_green = ["출력", "입력"];

  for(var i in word_list_blue) {
    if( user_code.indexOf(word_list_blue[i]) !=   -1 ) {
      user_code = user_code.replace( new RegExp(word_list_blue[i], "g"), "<span class='ReservedWord_Blue'>" + word_list_blue[i] + "</span>");
    }
  }
  for(var i in word_list_purple) {
    if( user_code.indexOf(word_list_purple[i]) !=   -1 ) {
      user_code = user_code.replace( new RegExp(word_list_purple[i], "g"), "<span class='ReservedWord_Purple'>" + word_list_purple[i] + "</span>");
    }
  }
  for(var i in word_list_green) {
    if( user_code.indexOf(word_list_green[i]) !=   -1 ) {
      user_code = user_code.replace( new RegExp(word_list_green[i], "g"), "<span class='ReservedWord_Green'>" + word_list_green[i] + "</span>");
    }
  }
  $('#표시화면').html( user_code );
}
