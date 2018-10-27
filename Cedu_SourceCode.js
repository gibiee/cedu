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

function usercodeToTextarea(user_code_html) {
  user_code_html = user_code_html.replace(/<div>/g,'\n');
  user_code_html = user_code_html.replace(/<br>/g, '');
  user_code_html = user_code_html.replace(/<\/div>/g, '');
  user_code_html = user_code_html.replace(/<span class="ReservedWord">/g, '');
  user_code_html = user_code_html.replace(/<\/span>/g, '');
  user_code_html = user_code_html.replace(/&lt;/g, '<');
  user_code_html = user_code_html.replace(/&gt;/g, '>');
  user_code_html = user_code_html.replace(/&amp;/g, '&');

  $('#가려진textarea').text( user_code_html );
}
