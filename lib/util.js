/**
 * Indents a text.
 *
 * @param txt:string      The text to indent.
 * @param [level]:number  The level to indent.
 * @param [itxt]:string   The text that indents.
 */
function indent(txt, level = 1, itxt = "  ") {
  var pre;

  //(1) indent
  pre = "";
  for (let i = 0; i < level; ++i) pre += itxt;
  txt = txt.replace(/^/gm, pre);

  //(2) return
  return txt;
}
