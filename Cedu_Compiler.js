function compiler(user_code) {
  if(user_code.search("메인()") == -1) {
    $("#결과").text("오류 : 메인 함수가 없습니다!").css('color','red');return;
  }

  //중괄호 괄호 세기
  if( count_brace(user_code) == false ){ return false; }

  //소괄호 개수 세기
  if( count_parentheses(user_code) == false ) { return false; }

  $("#결과").text("컴파일 성공!").css('color','blue');
  return true;
}
function count_brace(user_code) {
  var left_brace = ( user_code.match(/{/g) || [] ).length;
  var right_brace = ( user_code.match(/}/g) || [] ).length;
  if( left_brace == 0 ) {
    $("#결과").text("오류 : 중괄호 '{' 가 없습니다!").css('color','red');return false;
  }
  else if( right_brace == 0 ) {
    $("#결과").text("오류 : 중괄호 '}' 가 없습니다!").css('color','red');return false;
  }
  else if( left_brace != right_brace ) {
    $("#결과").text("오류 : 중괄호의 '{', '}'의 개수가 서로 맞지 않습니다!").css('color','red');return false;
  }
  return true;
}
function count_parentheses(user_code) {
  var left_parentheses = ( user_code.match(/\(/g) || [] ).length;
  var right_parentheses = ( user_code.match(/\)/g) || [] ).length;
  if( left_parentheses == 0 ) {
    $("#결과").text("오류 : 소괄호 '(' 가 없습니다!").css('color','red');return false;
  }
  else if( right_parentheses == 0 ) {
    $("#결과").text("오류 : 소괄호 ')' 가 없습니다!").css('color','red');return false;
  }
  else if( left_parentheses != right_parentheses ) {
    $("#결과").text("오류 : 소괄호의 '(', ')'의 개수가 서로 맞지 않습니다!").css('color','red');return false;
  }
  return true;
}
