function execution(source_code) {

  var 입력_value = get_input_value();

  //Cedu 코드를 JavaScript로 바꾸기
  source_code = change_code(source_code);
  source_code = change_code_input(source_code, 입력_value);
  source_code = change_code_for(source_code);

  $("#출력").text('').css('color','black'); //출력박스 초기화

  eval(source_code);

  return true;
}

function get_input_value() {

  var input_array = $('#입력').val().split(/[\s]+/);
  var int_check;

  for(var i in input_array) {
    try {
      int_check = parseInt(input_array[i]); //정수인지 체크
      if(isNaN(int_check))  { throw "ThisIsString"; }
      else if(int_check == input_array[i]) { input_array[i] = parseInt(input_array[i]); } //정수로 변환
      else { input_array[i] = Number(input_array[i]); } //실수로 변환
    }
    catch {
      if (input_array[i].length == 0) { input_array.splice(i,1); }  //배열의 마지막 개행문자 삭제
      else if(input_array[i].length == 1) { //문자
      }
      else {  //문자열
      }
    }
  }
  return input_array;
}

function change_code_input(source_code, 입력_value) {
  var start = 0;
  var end;
  var in_variable = [];
  var index = 0;
  var str, temp_substr;

  while (true) {
    start = source_code.indexOf('입력', start);
    if(start == -1) break;
    start = source_code.indexOf('()',start);
    end = source_code.indexOf(')', start+1);
    //console.log(source_code[start],source_code[end]);
    in_variable = source_code.substring(start+3,end).split(/[\s,]+/);

    str = '';
    for(var i in in_variable){
      if(typeof 입력_value[index] == "number") {
        str += in_variable[i] + " = " + 입력_value[index++] + ";";
      }
      else {
        str += in_variable[i] + " = " + "'" + 입력_value[index++] + "'" + ";\n";
      }
    }
    end = source_code.indexOf(';', end);
    temp_substr = source_code.substring(start, end+1);
    source_code = source_code.replace(temp_substr, str);
  }
  return source_code;
}

function change_code_for(source_code) {
  var start = 0;
  var end;
  var in_start;
  var content;
  var temp_substr;

  while (true) {
    start = source_code.indexOf('반복', start+1);
    if(start == -1) break;
    end = source_code.indexOf(')', start);

    temp_str = source_code.substring(start,end+1);
    if ( temp_str.split(';').length == 1 ) {
      in_start = source_code.indexOf('(', start);
      source_code = source_code.replace(temp_str, "for(var __i = 0; __i < " + source_code.substring(in_start+1,end) + "; __i++)");
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
  //source_code = source_code.replace(/반복/g, 'for');
  source_code = source_code.replace(/계속/g, 'continue');
  source_code = source_code.replace(/그만/g, 'break');

  source_code = source_code.replace(/줄바꿈\(\);/g, '$("#출력").append("\\n")');

  source_code += "\n메인();";

  //console.log(source_code);

  return source_code;
}
