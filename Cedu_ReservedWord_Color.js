function reservedWord_color(source_code) {

  var word_list_blue = ["만약", "그렇지않으면", "그렇지않다면", "반복"];
  var word_list_purple = ["변수", "함수"];
  var word_list_green = ["출력", "입력"];
  var word_list_orange =[];

  var start = 0;
  var end;
  var temp_str;

  for(var i in word_list_blue) {
    source_code = source_code.replace( new RegExp(word_list_blue[i], "g"), "<span class='ReservedWord_Blue'>" + word_list_blue[i] + "</span>");
  }
  start = 0;
  for(var i in word_list_purple) {
    while(true) {
      start = source_code.indexOf("변수",start+1);
      if(start == -1) break;
      end = start + word_list_purple[i].length - 1;

      console.log(source_code[end+1]);

      if(source_code[start-1] == '>' || source_code[start-1] == '<') {
        continue;
      }
      else if(/[\w가-힣]/.test(source_code[start-1]) || /[\w가-힣]/.test(source_code[end+1]))
      {
        continue;
      }
      else {
        temp_str = source_code.substring(start,end+1);
        source_code = source_code.substring(0,start) + "<span class='ReservedWord_Purple'>" + word_list_purple[i] + "</span>" + source_code.substring(end+1);
      }
    }
  }

  for(var i in word_list_green) {
      source_code = source_code.replace( new RegExp(word_list_green[i], "g"), "<span class='ReservedWord_Green'>" + word_list_green[i] + "</span>");
  }

  $('#표시화면').html( source_code );
}
