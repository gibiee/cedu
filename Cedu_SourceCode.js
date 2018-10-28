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

function useEnter(e) {
  e.preventDefault();  // this will prevent us from tabbing out of the editor

  // now insert four non-breaking spaces for the tab key
  var editor = e.target;
  var doc = editor.ownerDocument.defaultView;
  var sel = doc.getSelection();
  var range = sel.getRangeAt(0);

  var tabNode = document.createTextNode('\n');
  range.insertNode(tabNode);

  range.setStartAfter(tabNode);
  range.setEndAfter(tabNode);
  sel.removeAllRanges();
  sel.addRange(range);
}
