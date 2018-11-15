function compile(source_code) {

  $("#출력").text('').css('color','black'); //출력박스 초기화

  if(source_code.search("함수 메인()") == -1) { $("#출력").text("오류 : 메인 함수가 없습니다!").css('color','red');return; }

  if( 중괄호_세기(source_code) == false ) return false;  //중괄호 괄호 세기
  if( 소괄호_세기(source_code) == false ) return false; //소괄호 개수 세기
  if( 대괄호_세기(source_code) == false ) return false; //대괄호 괄호 세기

  if ( 줄마다_check(source_code) == false ) return false;

  입력값 = 입력값_얻기();  //입력값의 값들 가져오기
  source_code = 입력_코드바꾸기(source_code); //입력() 에 대해서만 코드 바꾸기(고정 자료형 체크를 하기 위해)
  if( source_code == false ) return false;

  var 변수들_type = get_variables_type(source_code); //선언된 변수들의 자료형 저장
  if( 변수들_type == false ) return false;
  if( equal_type_checking(source_code, 변수들_type) == false )  return false;  //고정 자료형 체크

  $("#출력").append("컴파일 성공!").css('color','blue');
  return [source_code, true];
}

function 중괄호_세기(source_code) {
  var left_medium = ( source_code.match(/{/g) || [] ).length;
  var right_medium = ( source_code.match(/}/g) || [] ).length;
  if( left_medium == 0 ) { $("#출력").text("오류 : 중괄호 '{' 가 없습니다!").css('color','red');return false; }
  else if( right_medium == 0 ) { $("#출력").text("오류 : 중괄호 '}' 가 없습니다!").css('color','red');return false; }
  else if( left_medium != right_medium ) { $("#출력").text("오류 : 중괄호의 '{', '}'의 개수가 서로 맞지 않습니다!").css('color','red');return false; }
  return true;
}
function 소괄호_세기(source_code) {
  var left_small = ( source_code.match(/\(/g) || [] ).length;
  var right_small = ( source_code.match(/\)/g) || [] ).length;
  if( left_small == 0 ) { $("#출력").text("오류 : 소괄호 '(' 가 없습니다!").css('color','red');return false; }
  else if( right_small == 0 ) { $("#출력").text("오류 : 소괄호 ')' 가 없습니다!").css('color','red');return false; }
  else if( left_small != right_small ) { $("#출력").text("오류 : 소괄호의 '(', ')'의 개수가 서로 맞지 않습니다!").css('color','red');return false; }
  return true;
}

function 대괄호_세기(source_code) {
  var left_big = ( source_code.match(/\[/g) || [] ).length;
  var right_big = ( source_code.match(/\]/g) || [] ).length;
  if( left_big != right_big ) { $("#출력").text("오류 : 대괄호의 '[', ']'의 개수가 서로 맞지 않습니다!").css('color','red');return false; }
  return true;
}

function 줄마다_check(source_code) {
  var each_line = source_code.split('\n');

  for(var i in each_line) {
    if( /[;{}]/.test(each_line[i])) continue;
    else if( each_line[i].indexOf('반복') != -1 ) continue;
    else if( each_line[i].indexOf('만약') != -1 ) continue;
    else if( each_line[i].indexOf('그렇지않으면') != -1 ) continue;
    else if( each_line[i].indexOf('그렇지않다면') != -1 ) continue;
    else if (each_line[i].indexOf('함수') != -1) continue;
    else {
      for(var one in each_line[i]) {
        if(/\s/.test(each_line[i][one]) == false ) {
          console.log(each_line[i]);
          var result = "<span style='color:red'>오류 : 세미콜론(;)이 빠진 줄이 있는지 확인하십시오.</span>\n"
          $('#출력').append(result);
          return false;
        }
      }
    }
  }
  return true;
}

function 입력값_얻기() {
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

function type_checking(value) {
  var number_check;
  var input_check;

  if(value.length == 0) return '공백';
  try {
    number_check = Number(value); //실수인지 문자인지 체크
    if(isNaN(number_check))  { throw "ThisIsString"; }
    else {  // 실수 또는 정수
      int_check = parseInt(value);
      if(number_check == int_check) { return '정수'; }
      else { return '실수'; }
    }
  }
  catch (e) { //문자 또는 문자열인 경우
    if(value.length == 1) { return '문자'; }
    else { return '문자열'; }
  }
}

function 입력_코드바꾸기(source_code) {
  var start = -1, end;
  var in_variable = [];
  var index = 0;
  var change_str, str;
  var 입력변수개수 = 0;

  while (true) {
    start = source_code.indexOf('입력(', start+1);
    if(start == -1) break;
    start = start + 3;
    end = source_code.indexOf(')', start);

    in_variable = source_code.substring(start,end).split(',');
    str = '';
    for(var i in in_variable) {
      in_variable[i] = in_variable[i].replace(/^\s*/g, '').replace(/\s*$/g, '');
      입력변수개수++;

      if(typeof 입력값[index] == "number") { str += in_variable[i] + " = " + 입력값[index++] + ";"; }
      else { str += in_variable[i] + " = " + "'" + 입력값[index++] + "'" + ";"; }
    }
    end = source_code.indexOf(';', end);
    change_str = source_code.substring(start-3, end+1);
    source_code = source_code.replace(change_str, str);
  }

  if(입력변수개수 > 0) {
    if(입력변수개수 > 입력값.length) {
      var result = "<span style='color:red'>오류 : 입력 값이 충분하지 않습니다.\n</span>";
      $('#출력').append(result);
      return false;
    }
    else if(입력변수개수 != 입력값.length) {
      var result = "<span style='color:orange'>경고 : 입력 값을 받을 변수의 수가 입력 값의 수보다 더 많습니다.\n</span>";
      $('#출력').append(result);
    }
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
      start = source_code.indexOf(' ', start);

      end_1 = source_code.indexOf(';',start);
      if( end_1 == -1 ) end_1 = Infinity;
      end_2 = source_code.indexOf('=',start);
      if( end_2 == -1 ) end_2 = Infinity;
      end = Math.min(end_1, end_2);

      str = source_code.substring(start,end).split(',');
      for(var j in str) {
        str[j] = str[j].replace(/^\s/,'').replace(/\s$/,'');
        if(/\s/.test(str[j])) {
          var result = "<span style='color:red'>오류 : 변수명에 공백이 있습니다.\n</span>";
          $('#출력').append(result);
          return false;
        }
        type[str[j]] = 변수종류[i];
      }
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
    else if( source_code[equal+1] == '=' || source_code[equal-1] == '=' || source_code[equal-1] == '!') continue; //==, != 인 경우
    else if( source_code[equal-1] == '>' || source_code[equal-1] == '<') continue; //>=, <= 인 경우

    can_break = false;
    for(start = equal - 1; start >= 0; start--) {
      if( /\s/.test(source_code[start]) == false ) { can_break = true; }
      if(can_break == true && /[\s{}();]/.test(source_code[start]) ) { break; }
    }
    can_break = false;
    for(end = equal + 1; end <= source_code.length; end++) {
      if( /\s/.test(source_code[end]) == false ) { can_break = true; }
      if(can_break == true && source_code[end] == ';' ) { break; }
    }
    var str = source_code.substring(start+1,end);
    str = str.replace(/^\s*/,'').replace(/\s*$/,'').split(/\s*=\s*/);

    left_type = 변수들_type[str[0]];
    right_type = 변수들_type[str[1]];

    if(left_type == undefined) {  //왼쪽이 선언된 변수가 아닐 때
      var result = "<span style='color:red'>오류 : 변수 " + str[0] + "의 선언 여부를 확인해주세요.</span>\n"
      $('#출력').append(result);
      return false;
    }
    else if(right_type == undefined){ //오른쪽이 변수가 아닐 때
      right_type = type_checking(str[1].replace(/'/g,''));

      if(left_type == "변수") continue;
      else if(left_type == right_type) continue;
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
