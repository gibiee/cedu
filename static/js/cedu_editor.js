function key_event(e) {
  // get caret position/selection
  var start = this.selectionStart;
  var end = this.selectionEnd;

  var $this = $(this);
  var value = $this.val();

  if(e.keyCode == 9) {  //텍스트상자에서 Tab키를 사용 가능하게
    // set textarea value to: text before caret + tab + text after caret
    $this.val(value.substring(0, start) + "\t" + value.substring(end));

    // put caret at right position again (add one for the tab)
    this.selectionStart = this.selectionEnd = start + 1;
  }
  else if(e.keyCode == 13) {  //엔터 시 자동 들여쓰기
    var str = value.substring(0, start);
    var left = ( str.match(/{/g) || [] ).length;
    var right = ( str.match(/[}]/g) || [] ).length;
    var count = left - right;
    if(count < 0) count = 0;
    var tab_count = '';
    for(var i=0; i<count; i++) {  tab_count += '\t'; }

    $this.val(value.substring(0, start) + "\n" +
    tab_count + value.substring(end));

    this.selectionStart = this.selectionEnd = start + 1 + count;

    if( end == value.length) {  //코드의 끝에서 엔터를 쳤을 때
      var m = $(this);
      m.scrollTop(m[0].scrollHeight);
    }
  }
  else if(e.keyCode == 221) { //}으로 닫을 때 자동 들여쓰기 1칸 제거
    var blank_count = 0;
    for(var i = start-1; i>=0; i--) {
      if(value[i] == '\n') break;
      else if(/\s/.test(value[i]))  blank_count++;
      else break;
    }
    if(blank_count >= 1) {
      $this.val(value.substring(0, start-1) + "}" + value.substring(end));
      this.selectionStart = this.selectionEnd = start;
    }
    else {
      $this.val(value.substring(0, start) + "}" + value.substring(end));
      this.selectionStart = this.selectionEnd = start + 1;
    }

  }
  // prevent the focus lose
  e.preventDefault();
}

function 스크롤공유() {
  $('#표시화면').scrollTop( $('#소스코드').scrollTop() );
  $('#표시화면').scrollLeft( $('#소스코드').scrollLeft() );
}

function 예약어_color(source_code) {

  var word_list_blue = ["만약", "그렇지않으면", "그렇지않다면", "반복"];
  var word_list_purple = ["변수", "함수", "실수", "정수", "문자", "문자열"];
  var word_list_green = ["출력", "입력"];
  var word_list_orange =["줄바꿈"];

  var start = -1;
  var end;
  var temp_str;

  for(var i in word_list_blue) {
    start = -1;
    while(true) {
      start = source_code.indexOf(word_list_blue[i],start+1);
      if(start == -1) break;
      end = start + word_list_blue[i].length - 1;

      if(start != 0 && ( source_code[start-1] == '>' || source_code[end+1] == '<' )) { continue; }
      else if(start != 0 && ( /[\w가-힣]/.test(source_code[start-1]) || /[\w가-힣]/.test(source_code[end+1]) )) { continue; }
      else {
        temp_str = source_code.substring(start,end+1);
        source_code = source_code.substring(0,start) + "<span class='ReservedWord_Blue'>" + word_list_blue[i] + "</span>" + source_code.substring(end+1);
      }
    }
    //source_code = source_code.replace( new RegExp(word_list_blue[i], "g"), "<span class='ReservedWord_Blue'>" + word_list_blue[i] + "</span>");
  }

  for(var i in word_list_purple) {
    start = -1;
    while(true) {
      start = source_code.indexOf(word_list_purple[i],start+1);
      if(start == -1) break;
      end = start + word_list_purple[i].length - 1;

      if(start != 0 && ( source_code[start-1] == '>' || source_code[end+1] == '<' )) { continue; }
      else if(start != 0 && ( /[\w가-힣]/.test(source_code[start-1]) || /[\w가-힣]/.test(source_code[end+1]) )) { continue; }
      else {
        temp_str = source_code.substring(start,end+1);
        source_code = source_code.substring(0,start) + "<span class='ReservedWord_Purple'>" + word_list_purple[i] + "</span>" + source_code.substring(end+1);
      }
    }
  }

  for(var i in word_list_green) {
    start = -1;
    while(true) {
      start = source_code.indexOf(word_list_green[i],start+1);
      if(start == -1) break;
      end = start + word_list_green[i].length - 1;

      if(start != 0 && ( source_code[start-1] == '>' || source_code[end+1] == '<' )) { continue; }
      else if(start != 0 && ( /[\w가-힣]/.test(source_code[start-1]) || /[\w가-힣]/.test(source_code[end+1]) )) { continue; }
      else {
        temp_str = source_code.substring(start,end+1);
        source_code = source_code.substring(0,start) + "<span class='ReservedWord_Green'>" + word_list_green[i] + "</span>" + source_code.substring(end+1);
      }
    }
    //source_code = source_code.replace( new RegExp(word_list_green[i], "g"), "<span class='ReservedWord_Green'>" + word_list_green[i] + "</span>");
  }

  for(var i in word_list_orange) {
    start = -1;
    while(true) {
      start = source_code.indexOf(word_list_orange[i],start+1);
      if(start == -1) break;
      end = start + word_list_orange[i].length - 1;

      if(start != 0 && ( source_code[start-1] == '>' || source_code[end+1] == '<' )) { continue; }
      else if(start != 0 && ( /[\w가-힣]/.test(source_code[start-1]) || /[\w가-힣]/.test(source_code[end+1]) )) { continue; }
      else {
        temp_str = source_code.substring(start,end+1);
        source_code = source_code.substring(0,start) + "<span class='ReservedWord_Orange'>" + word_list_orange[i] + "</span>" + source_code.substring(end+1);
      }
    }
  }

  $('#표시화면').html( source_code );
}
