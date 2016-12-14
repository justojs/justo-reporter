"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.






indent = indent;function indent(txt) {var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;var itxt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "  ";
  var pre;


  if (txt) {
    pre = "";
    for (var i = 0; i < level; ++i) {pre += itxt;}
    txt = txt.replace(/^/gm, pre);
  } else {
    txt = "";
  }


  return txt;
}
