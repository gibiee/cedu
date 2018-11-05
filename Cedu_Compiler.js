function compiler(source_code) {

  if(source_code.search("메인()") == -1) {
    $("#출력").text("오류 : 메인 함수가 없습니다!").css('color','red');return;
  }


  if( count_medium(source_code) == false ){ return false; }  //중괄호 괄호 세기
  if( count_small(source_code) == false ) { return false; } //소괄호 개수 세기
  if( count_big(source_code) == false ){ return false; }  //대괄호 괄호 세기

  $("#출력").text("컴파일 성공!").css('color','blue');
  return true;
}

function count_medium(source_code) {
  var left_medium = ( source_code.match(/{/g) || [] ).length;
  var right_medium = ( source_code.match(/}/g) || [] ).length;
  if( left_medium == 0 ) {
    $("#출력").text("오류 : 중괄호 '{' 가 없습니다!").css('color','red');return false;
  }
  else if( right_medium == 0 ) {
    $("#출력").text("오류 : 중괄호 '}' 가 없습니다!").css('color','red');return false;
  }
  else if( left_medium != right_medium ) {
    $("#출력").text("오류 : 중괄호의 '{', '}'의 개수가 서로 맞지 않습니다!").css('color','red');return false;
  }
  return true;
}
function count_small(source_code) {
  var left_small = ( source_code.match(/\(/g) || [] ).length;
  var right_small = ( source_code.match(/\)/g) || [] ).length;
  if( left_small == 0 ) {
    $("#출력").text("오류 : 소괄호 '(' 가 없습니다!").css('color','red');return false;
  }
  else if( right_small == 0 ) {
    $("#출력").text("오류 : 소괄호 ')' 가 없습니다!").css('color','red');return false;
  }
  else if( left_small != right_small ) {
    $("#출력").text("오류 : 소괄호의 '(', ')'의 개수가 서로 맞지 않습니다!").css('color','red');return false;
  }
  return true;
}

function count_big(source_code) {
  var left_big = ( source_code.match(/\[/g) || [] ).length;
  var right_big = ( source_code.match(/\]/g) || [] ).length;

  if( left_big != right_big ) {
    $("#출력").text("오류 : 대괄호의 '[', ']'의 개수가 서로 맞지 않습니다!").css('color','red');return false;
  }
  return true;
}
