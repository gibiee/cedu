function execution(user_code) {

  //Cedu 코드를 JavaScript로 바꾸기
  user_code = change_code(user_code);

  //결과값 창 초기화
  $("#출력").text('').css('color','black');

  eval(user_code);

  return true;
}

function change_code(user_code) {
  user_code = user_code.replace(/변수/g, 'var');
  user_code = user_code.replace(/함수/g, 'function');
  user_code = user_code.replace(/출력/g, '$("#출력").append');
  user_code = user_code.replace(/만약/g, 'if');
  user_code = user_code.replace(/그렇지않으면/g, 'else');
  user_code = user_code.replace(/그렇지않다면/g, 'else');
  user_code = user_code.replace(/반복/g, 'for');
  user_code = user_code.replace(/계속/g, 'continue');
  user_code = user_code.replace(/그만/g, 'break');

  user_code = user_code.replace(/줄바꿈\(\);/g, '$("#결과").append("\\n")');

  user_code += "\n메인();";

  //console.log(user_code);

  return user_code;
}
