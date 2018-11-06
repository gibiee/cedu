function execution(source_code) {

  $("#출력").text('').css('color','black'); //출력박스 초기화

  //source_code = change_code_input(source_code, 입력창_value);

  source_code = check_출력_undefined(source_code);  //출력 중 undefined 체크

  //Cedu 코드를 JavaScript로 바꾸기
  source_code = change_code_for(source_code);
  source_code = change_code(source_code);

  try {
    var err_value;
    var err_lineNo;
    console.log(source_code);
    eval(source_code);
  }
  catch(e) {
    console.log(e);
    if($('#출력').text() != "") $("#출력").append('\n');

    if(e == 'Undefined') {
      var result = "<span style='color:red'>오류 : 변수 " + err_value + "의 출력은 값이 없습니다.\n</span>";
      $("#출력").append(result);
    }
    else {
      var err_lineNo = Number(error_line_check(e.stack));
      if( isNaN(err_lineNo) ) {
        var result = "<span style='color:red'>오류 : 예기치 않은 오류 발생!\n</span>"
      }
      else {
        var result = "<span style='color:red'>오류 : " + err_lineNo +"번째 줄에서 예기치 않은 오류 발생!\n</span>"
      }
      $("#출력").append(result);
    }
  }
  return true;
}

function check_출력_undefined(source_code) {
  var start = -1
  var in_start, end;
  var content;
  var isUndefined;

  while(true) {
    start = source_code.indexOf('출력(', start+1);
    if(start == -1) break;
    start = start + 3;
    end = source_code.indexOf(')', start);

    var value =  source_code.substring(start,end);
    value = value.split(",");
    isUndefined = '';
    for (var i in value) {
      content = value[i].replace(/\s/g,'');
      isUndefined += " null_check(" + content + ", '" + content + "');";
    }
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

  var start = -1, end;
  var change = {  //변수명으로 사용될 시 문제가 있는 예약어들
    '변수' : 'var',
    '실수' : 'let',
    '정수' : 'let',
    '문자열' : 'let',
    '문자' : 'let',
    '함수' : 'function',
  };

  source_code = source_code.replace(/출력\(/g, '$("#출력").append(');
  source_code = source_code.replace(/만약\s*\(/g, 'if(');
  source_code = source_code.replace(/그렇지않으면\s*{/g, 'else {');
  source_code = source_code.replace(/그렇지않다면\s*{/g, 'else {');
  source_code = source_code.replace(/반복\(/g, 'for(');
  source_code = source_code.replace(/계속;/g, 'continue;');
  source_code = source_code.replace(/그만;/g, 'break;');
  source_code = source_code.replace(/정수\(/g, 'parseInt(');
  source_code = source_code.replace(/의 길이/g, '.length');

  for(var i in change) {
    while(true) {
      start = source_code.indexOf(i, start+1);
      if(start == -1) break;
      end = start + i.length - 1;

      if( (/[\s{}();]/.test(source_code[start-1]) || start == 0) && /[\s{}();]/.test(source_code[end+1]) ) {
        source_code = source_code.substring(0,start) + change[i] + source_code.substring(end+1, source_code.length);
      }
    }
  }
  source_code = source_code.replace(/줄바꿈\(\);/g, "$('#출력').append('\\n');");

  source_code += "\n메인();";
  source_code += "\n\nfunction null_check(value,str) {\n if(value == undefined || value == null) {\n  err_value = str;\n  throw 'Undefined'\n }\n}";

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
