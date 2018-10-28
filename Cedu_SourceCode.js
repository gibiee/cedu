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

/* For <div>
function useTab(e) {
  e.preventDefault();  // this will prevent us from tabbing out of the editor

  // now insert four non-breaking spaces for the tab key
  var editor = e.target;
  var doc = editor.ownerDocument.defaultView;
  var sel = doc.getSelection();
  var range = sel.getRangeAt(0);

  var tabNode = document.createTextNode('\t');
  range.insertNode(tabNode);

  range.setStartAfter(tabNode);
  range.setEndAfter(tabNode);
  sel.removeAllRanges();
  sel.addRange(range);
}
*/
/*
function useEnter(e) {
  e.preventDefault();  // this will prevent us from tabbing out of the editor

  // now insert four non-breaking spaces for the tab key
  var editor = e.target;
  var doc = editor.ownerDocument.defaultView;
  var sel = doc.getSelection();
  var range = sel.getRangeAt(0);

  var tabNode = document.createTextNode('<br>');
  range.insertNode(tabNode);

  range.setStartAfter(tabNode);
  range.setEndAfter(tabNode);
  sel.removeAllRanges();
  sel.addRange(range);
}
*/
