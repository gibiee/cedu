function compiler(source_code) {

  if(source_code.search("함수 메인()") == -1) { $("#출력").text("오류 : 메인 함수가 없습니다!").css('color','red');return; }

  if( count_medium(source_code) == false ){ return false; }  //중괄호 괄호 세기
  if( count_small(source_code) == false ) { return false; } //소괄호 개수 세기
  if( count_big(source_code) == false ){ return false; }  //대괄호 괄호 세기

  //입력값의 값들 가져오기
  입력창_value = get_입력창_value();
  입력함수_variables = get_입력함수_variables(source_code);

  if(입력함수_variables == false) { return false; }
  else {
    $("#출력").append("컴파일 성공!").css('color','blue');
    return true;
  }
}

function count_medium(source_code) {
  var left_medium = ( source_code.match(/{/g) || [] ).length;
  var right_medium = ( source_code.match(/}/g) || [] ).length;
  if( left_medium == 0 ) { $("#출력").text("오류 : 중괄호 '{' 가 없습니다!").css('color','red');return false; }
  else if( right_medium == 0 ) { $("#출력").text("오류 : 중괄호 '}' 가 없습니다!").css('color','red');return false; }
  else if( left_medium != right_medium ) { $("#출력").text("오류 : 중괄호의 '{', '}'의 개수가 서로 맞지 않습니다!").css('color','red');return false; }
  return true;
}
function count_small(source_code) {
  var left_small = ( source_code.match(/\(/g) || [] ).length;
  var right_small = ( source_code.match(/\)/g) || [] ).length;
  if( left_small == 0 ) { $("#출력").text("오류 : 소괄호 '(' 가 없습니다!").css('color','red');return false; }
  else if( right_small == 0 ) { $("#출력").text("오류 : 소괄호 ')' 가 없습니다!").css('color','red');return false; }
  else if( left_small != right_small ) { $("#출력").text("오류 : 소괄호의 '(', ')'의 개수가 서로 맞지 않습니다!").css('color','red');return false; }
  return true;
}

function count_big(source_code) {
  var left_big = ( source_code.match(/\[/g) || [] ).length;
  var right_big = ( source_code.match(/\]/g) || [] ).length;
  if( left_big != right_big ) { $("#출력").text("오류 : 대괄호의 '[', ']'의 개수가 서로 맞지 않습니다!").css('color','red');return false; }
  return true;
}

function get_입력창_value() {
  var input_array = $('#입력').val().split(/[\s]+/);
  var type;

  for(var i in input_array) {
    type = type_checking(input_array[i]);
    if(type == '공백') { input_array.splice(i,1); } //공백인 경우 원소 삭제
    else if(type == '실수') { input_array[i] = Number(input_array[i]); }
    else if(type == '정수') { input_array[i] = parseInt(input_array[i]); }
    else { //문자 또는 문자열인 경우
    }
  }
  return input_array;
}

function type_checking(value)
{
  var number_check;
  var input_check;

  if(value.length == 0) return '공백';
  try {
    number_check = Number(value); //실수인지 문자인지 체크
    if(isNaN(number_check))  { throw "ThisIsString"; }
    else {  // 실수 또는 정수
      int_check = parseInt(value);
      if(number_check == int_check) { return '정수'; }
      else { return '실수' }
    }
  }
  catch { //문자 또는 문자열인 경우
    if(value.length == 1) { return '문자' }
    else { return '문자열' }
  }
}

function get_입력함수_variables(source_code) {
  var start = -1, in_start;
  var end;
  var in_variable = [];
  var index = 0;
  var str, temp_substr;
  var count = 0;

  while (true) {
    start = source_code.indexOf('입력(', start+1);
    if(start == -1) break;
    in_start = start + 3;
    end = source_code.indexOf(')', start);

    in_variable = source_code.substring(in_start,end).split(',');
    for(var i in in_variable) { in_variable[i] = in_variable[i].replace(/^\s*/g, '').replace(/\s*$/g, ''); }

    end = source_code.indexOf(';', end);
  }
  console.log(in_variable);
  console.log(입력창_value);
  if(in_variable.length > 0)
  {
    if(in_variable.length > 입력창_value.length) {
      var result = "<span style='color:red'>오류 : 입력 값이 충분하지 않습니다.\n</span>";
      $('#출력').append(result);
      return false;
    }
    else if(in_variable.length != 입력창_value.length) {
      var result = "<span style='color:orange'>경고 : 입력 값을 받을 변수의 수가 입력 값의 수보다 더 많습니다.\n</span>";
      $('#출력').append(result);
    }
  }
  return in_variable;
}
