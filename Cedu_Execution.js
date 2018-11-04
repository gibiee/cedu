function execution(source_code) {

  $("#출력").text('').css('color','black'); //출력박스 초기화

  var 변수들_type = get_variables_type(source_code); //선언된 변수들의 자료형 저장
  var 입력_value = get_input_value();

  //Cedu 코드를 JavaScript로 바꾸기
  source_code = change_code_input(source_code, 입력_value);
  source_code = change_code_for(source_code);
  source_code = change_code(source_code);

  //고정 자료형 체크
  var type_check = equal_type_checking(source_code, 변수들_type);

  console.log(source_code);
  try {
    eval(source_code);
  }
  catch(e) {
    $("#출력").text('예기치 않은 에러 발생!\n').css('color','red');
    $("#출력").append(e.name);
    $("#출력").append(e.lineNumber);
  }
  return true;
}

function get_input_value() {
  var input_array = $('#입력').val().split(/[\s]+/);
  var type;

  for(var i in input_array) {
    type = type_checking(input_array[i]);
    if(type == '공백')  continue;
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

function change_code_input(source_code, 입력_value) {
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
    //console.log(source_code.substring(in_start,end));

    in_variable = source_code.substring(in_start,end).split(/[\s,]+/);
    count += in_variable.length;
    str = '';
    for(var i in in_variable){
      if(typeof 입력_value[index] == "number") {
        str += in_variable[i] + " = " + 입력_value[index++] + ";";
      }
      else {
        str += in_variable[i] + " = " + "'" + 입력_value[index++] + "'" + ";";
      }
    }
    end = source_code.indexOf(';', end);
    temp_substr = source_code.substring(start, end+1);
    source_code = source_code.replace(temp_substr, str);
  }

  if(입력_value.length != count) { $("#출력표시").text("주의 : 입력 받는 변수와 입력 값의 수가 서로 다릅니다.\n").css('color','orange'); }

  return source_code;
}

function change_code_for(source_code) {
  var start = -1, in_start;
  var end;
  var temp_substr;
  var in_variable
  var i_for, i_num = 0;

  while (true) {
    start = source_code.indexOf('반복', start+1);
    if(start == -1) break;
    end = source_code.indexOf(')', start);

    temp_str = source_code.substring(start,end+1);
    if ( temp_str.split(';').length == 1 ) {
      in_start = source_code.indexOf('(', start);
      in_variable = source_code.substring(in_start+1,end);
      i_for = "__i" + i_num++;
      source_code = source_code.replace(temp_str, "for(var " + i_for + " = 0; " + i_for + " < " + in_variable + "; " + i_for + "++)");
    }
  }
  return source_code;
}

function change_code(source_code) {
  source_code = source_code.replace(/변수/g, 'var');
  source_code = source_code.replace(/함수/g, 'function');
  source_code = source_code.replace(/출력/g, '$("#출력").append');
  source_code = source_code.replace(/만약/g, 'if');
  source_code = source_code.replace(/그렇지않으면/g, 'else');
  source_code = source_code.replace(/그렇지않다면/g, 'else');
  source_code = source_code.replace(/반복/g, 'for');
  source_code = source_code.replace(/계속/g, 'continue');
  source_code = source_code.replace(/그만/g, 'break');

  source_code = source_code.replace(/실수/g, 'let');
  source_code = source_code.replace(/정수/g, 'let');
  source_code = source_code.replace(/문자열/g, 'let');
  source_code = source_code.replace(/문자/g, 'let');

  source_code = source_code.replace(/줄바꿈\(\);/g, '$("#출력").append("\\n")');

  source_code += "\n메인();";

  return source_code;
}

function get_variables_type(source_code) {
  var 변수종류 = [ '변수', '실수', '정수', '문자', '문자열' ];
  var start = -1 , end;
  var end_1, end_2;
  var type = {}; //객체배열
  var index = 0;
  var str;

  for(var i in 변수종류) {
    while(true) {
      start = source_code.indexOf(변수종류[i] + ' ', start+1);
      if(start == -1) break;

      end_1 = source_code.indexOf(';',start);
      if( end_1 == -1 ) end_1 = Infinity;
      end_2 = source_code.indexOf('=',start);
      if( end_2 == -1 ) end_2 = Infinity;

      end = Math.min(end_1, end_2);

      str = source_code.substring(start,end).split(/[\s]+/);
      type[str[1]] = str[0];
    }
  }
  return type;
}

function equal_type_checking(source_code, 변수들_type)
{
  var equal = -1;
  var start, end;
  var can_break = false;
  var left_type, right_type;

  while(true) {
    equal = source_code.indexOf('=', equal+1);
    if( equal == -1 ) break;

    can_break = false;
    for(start = equal - 1; start >= 0; start--) {
      if( /\s/.test(source_code[start]) == false ) { can_break = true; }
      if(can_break == true && /[\s{}();]/.test(source_code[start]) ) { break; }
    }
    can_break = false;
    for(end = equal + 1; end <= source_code.length; end++) {
      if( /\s/.test(source_code[end]) == false ) { can_break = true; }
      if(can_break == true && /[\s;]/.test(source_code[end]) ) { break; }
    }
    var str = source_code.substring(start+1,end).replace(/[\s]+/g, '');
    str = str.split('=');
    left_type = 변수들_type[str[0]];
    right_type = 변수들_type[str[1]];
    console.log(변수들_type);

    if(left_type == undefined) {  //왼쪽이 선언된 변수가 아닐 때
      $('#출력표시').append('선언된 변수인지 확인 필요\n');
      return false;
    }
    else if(right_type == undefined){
      right_type = type_checking(str[1].replace(/'/g,''));

      if(left_type == right_type) continue;
      else if(left_type == '실수' && right_type == '정수') continue;
      else if(left_type == '문자열' && right_type == '문자') continue;
      else {
        $('#출력표시').append('변수 ' + str[0] + '의 자료형이 서로 일치하는지 확인 필요\n').css('color','black');
        return false;
      }
    }
    else { //오른쪽 또한 변수일 때
      if(left_type == right_type) continue;
      else {
        $('#출력표시').append('변수 ' + str[0] + '와 변수 ' + str[1] + '의 자료형이 서로 일치하는지 확인 필요\n');
        return false;
      }
    }
  }
  return true;
}
