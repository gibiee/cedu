function useTab(e) {
  // get caret position/selection
  var start = this.selectionStart;
  var end = this.selectionEnd;

  var $this = $(this);
  var value = $this.val();

  // set textarea value to: text before caret + tab + text after caret
  $this.val(value.substring(0, start)
  + "\t"
  + value.substring(end));

  // put caret at right position again (add one for the tab)
  this.selectionStart = this.selectionEnd = start + 1;

  // prevent the focus lose
  e.preventDefault();
}

function auto_tab(e) {
  var start = this.selectionStart;
  var end = this.selectionEnd;

  var $this = $(this);
  var value = $this.val();

  // set textarea value to: text before caret + tab + text after caret
  $this.val(value.substring(0, start)
  + "\n"
  + value.substring(end));

  // put caret at right position again (add one for the tab)
  this.selectionStart = this.selectionEnd = start + 1;

  // prevent the focus lose
  e.preventDefault();
}

function shareScroll() {
  $('#표시화면').scrollTop( $('#소스코드').scrollTop() );
  $('#표시화면').scrollLeft( $('#소스코드').scrollLeft() );
}

function reservedWord_color(source_code) {

  var word_list_blue = ["만약", "그렇지않으면", "그렇지않다면", "반복"];
  var word_list_purple = ["변수", "함수", "실수", "정수", "문자", "문자열"];
  var word_list_green = ["출력", "입력"];
  var word_list_orange =[];

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

  $('#표시화면').html( source_code );
}
