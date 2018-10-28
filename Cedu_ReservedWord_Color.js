function reservedWord_color(user_code) {

  var word_list = {
    //찾는 문자열 : 바꿀 문자열
    "변수" : "변수",
    "함수" : "함수",
    "만약" : "만약",
    "그렇지않으면" : "그렇지않으면",
    "그렇지않다면" : "그렇지않다면",
    "반복" : "반복"
  }

  for(var i in word_list) {
    if( user_code.indexOf(i) !=   -1 ) {
      user_code = user_code.replace( new RegExp(word_list[i], "g"), "<span class='ReservedWord_Blue'>" + word_list[i] + "</span>");
      $('#표시화면').html( user_code );
    }
  }
}
