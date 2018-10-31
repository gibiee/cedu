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

function shareScroll() {
  $('#표시화면').scrollTop( $('#소스코드').scrollTop() );
  $('#표시화면').scrollLeft( $('#소스코드').scrollLeft() );
}
