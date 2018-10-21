function useTab(e)
{
  var keyCode = e.keyCode || e.which;
  if (keyCode == 9) {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;
    var text = $(this).val();
    var selText = text.substring(start, end);
    $(this).val(
      text.substring(0, start) +
      "    " + selText.replace(/\n/g, "\n\t") +
      text.substring(end)
    );
    this.selectionStart = this.selectionEnd = start + 4;
  }
}
