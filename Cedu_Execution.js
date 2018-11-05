function execution(source_code) {

  $("#출력").text('').css('color','black'); //출력박스 초기화

  //입력값 집어넣는 처리
  var 입력_value = get_input_value();
  source_code = change_code_input(source_code, 입력_value);

  //고정 자료형 체크
  var 변수들_type = get_variables_type(source_code); //선언된 변수들의 자료형 저장
  if( equal_type_checking(source_code, 변수들_type) == false )  return false;

  //출력 중 undefined 체크
  source_code = check_출력_undefined(source_code);

  //Cedu 코드를 JavaScript로 바꾸기
  source_code = change_code_for(source_code);
  source_code = change_code(source_code);

  console.log(source_code);
  try {
    var err_value;
    var err_lineNo;
    eval(source_code);
  }
  catch(e) {
    if(e == 'Undefined') {
      var result = "<span style='color:red'>에러 : 변수 " + err_value + "의 출력은 값이 없습니다.\n</span>";
      $("#출력").append(result);
    }
    else {
      var err_lineNo = Number(error_line_check(e.stack));
      if( isNaN(err_lineNo) ) {
        var result = "<span style='color:red'>에러 : 예기치 않은 에러 발생!\n</span>"
      }
      else {
        var result = "<span style='color:red'>에러 : " + err_lineNo +"번째 줄에서 예기치 않은 에러 발생!\n</span>"
      }
      $("#출력").append(result);
    }
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

  if(입력_value.length != count) {
    var result = "<span style='color:orange'>경고 : 입력 받는 변수와 입력 값의 수가 서로 다릅니다.\n</span>"
    $('#출력').append(result);
  }

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

    if(left_type == undefined) {  //왼쪽이 선언된 변수가 아닐 때
      var result = "<span style='color:red'>오류 : 변수 " + str[0] + "의 선언 여부를 확인해주세요.</span>\n"
      $('#출력').append(result);
      return false;
    }
    else if(right_type == undefined){ //오른쪽이 변수가 아닐 때
      right_type = type_checking(str[1].replace(/'/g,''));

      if(left_type == right_type) continue;
      else if(left_type == '실수' && right_type == '정수') continue;
      else if(left_type == '문자열' && right_type == '문자') continue;
      else {
        if(left_type == '정수' && str[1].indexOf('정수(') != -1) continue;
        if(left_type == '문자' && str[1].indexOf('[') != -1 && str[1].indexOf(']') != -1 ) continue;

        var result = "<span style='color:red'>오류 : 변수 " + str[0] + "의 자료형에 " + str[1] + "의 값을 넣을 수 없습니다.</span>\n";
        $('#출력').append(result);
        return false;
      }
    }
    else { //오른쪽 또한 변수일 때
      if(left_type == right_type) continue;
      else if(left_type == '실수' && right_type == '정수') continue;
      else if(left_type == '문자열' && right_type == '문자') continue;
      else {
        var result = "<span style='color:red'>오류 : 변수 " + str[0] + "와 변수 " + str[1] + "의 자료형을 서로 확인하십시오.</span>\n";
        $('#출력').append(result);
        return false;
      }
    }
  }
  return true;
}

function check_출력_undefined(source_code) {
  var start = -1
  var in_start, end;

  while(true) {
    start = source_code.indexOf('출력(', start+1);
    if(start == -1) break;
    start = start + 3;
    end = source_code.indexOf(')', start);

    var value =  source_code.substring(start,end);
    var result = "<span style='color:red'>에러 : 값이 없는 출력이 있습니다.</span>\n";
    var isUndefined = "if(" + value + "==undefined || " + value +"==null){ err_value = '" + value + "';throw 'Undefined';}"
    end = source_code.indexOf(';', end);
    source_code = source_code.substring(0,end+1) + isUndefined + source_code.substring(end+1, source_code.length);
  }
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
  source_code = source_code.replace(/변수\s+/g, 'var ');
  source_code = source_code.replace(/함수\s+/g, 'function ');
  source_code = source_code.replace(/출력\(/g, '$("#출력").append(');
  source_code = source_code.replace(/만약\s*\(/g, 'if(');
  source_code = source_code.replace(/그렇지않으면\s*{/g, 'else {');
  source_code = source_code.replace(/그렇지않다면\s*{/g, 'else {');
  source_code = source_code.replace(/반복\(/g, 'for(');
  source_code = source_code.replace(/계속;/g, 'continue;');
  source_code = source_code.replace(/그만;/g, 'break;');
  source_code = source_code.replace(/정수\(/g, 'parseInt(');
  source_code = source_code.replace(/의 길이/g, '.length');

  source_code = source_code.replace(/실수\s+/g, 'let ');
  source_code = source_code.replace(/정수\s+/g, 'let ');
  source_code = source_code.replace(/문자열\s+/g, 'let ');
  source_code = source_code.replace(/문자\s+/g, 'let ');

  source_code = source_code.replace(/줄바꿈\(\);/g, "$('#출력').append('\\n');");

  source_code += "\n메인();";

  return source_code;
}

function error_line_check(error_stack)
{
  var message = error_stack.split('\n');
  var err_line;

  start = message[1].indexOf('<anonymous>:')+12;
  end = message[1].indexOf(':',start+1);
  err_line = Number(message[1].substring(start,end));

  return err_line;
}
