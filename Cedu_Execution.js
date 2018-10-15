function execution(user_code) {

  //Cedu 코드를 JavaScript로 바꾸기
  user_code = change_code(user_code);

  //결과값 창 초기화
  $("#결과").text('').css('color','black');

  eval(user_code);

  return true;
}


function change_code(user_code) {
  user_code = user_code.replace(/변수/g, 'var');
  user_code = user_code.replace(/함수/g, 'function');
  user_code = user_code.replace(/출력\(/g, '$("#결과").append(');
  user_code = user_code.replace(/줄바꿈\(\);/g, '$("#결과").append("\\n")');
  user_code += "\n메인();";

  console.log(user_code);

  return user_code;
}
