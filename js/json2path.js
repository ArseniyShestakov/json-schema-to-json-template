"use strict";
// Used from https://github.com/nidu/vscode-copy-json-path
Object.defineProperty(exports, "__esModule", { value: true });
var ColType;
(function (ColType) {
    ColType[ColType["Object"] = 0] = "Object";
    ColType[ColType["Array"] = 1] = "Array";
})(ColType || (ColType = {}));
function jsonPathTo(text, offset) {
    let pos = 0;
    let stack = [];
    let isInKey = false;
    // console.log('jsonPathTo:start', text, offset)
    while (pos < offset) {
        // console.log('jsonPathTo:step', pos, stack, isInKey)
        const startPos = pos;
        switch (text[pos]) {
            case '"':
                const { text: s, pos: newPos } = readString(text, pos);
                // console.log('jsonPathTo:readString', {s, pos, newPos, isInKey, frame: stack[stack.length - 1]})
                if (stack.length) {
                    const frame = stack[stack.length - 1];
                    if (frame.colType == ColType.Object && isInKey) {
                        frame.key = s;
                        isInKey = false;
                    }
                }
                pos = newPos;
                break;
            case '{':
                stack.push({ colType: ColType.Object });
                isInKey = true;
                break;
            case '[':
                stack.push({ colType: ColType.Array, index: 0 });
                break;
            case '}':
            case ']':
                stack.pop();
                break;
            case ',':
                if (stack.length) {
                    const frame = stack[stack.length - 1];
                    if (frame.colType == ColType.Object) {
                        isInKey = true;
                    }
                    else {
                        frame.index++;
                    }
                }
                break;
        }
        if (pos == startPos) {
            pos++;
        }
    }
    // console.log('jsonPathTo:end', {stack})
    return stack;
}
exports.jsonPathTo = jsonPathTo;

function readString(text, pos) {
    let i = pos + 1;
    i = findEndQuote(text, i);
    var textpos = {
        text: text.substring(pos + 1, i),
        pos: i + 1
    };
    // console.log('ReadString: text:' + textpos.text + ' :: pos: ' + pos)
    return textpos;
}
function isEven(n) {
    return n % 2 == 0;
}

// Find the next end quote
function findEndQuote(text, i) {
    while (i < text.length) {
        // console.log('findEndQuote: ' + i + ' : ' + text[i])
        if (text[i] == '"') {
            var bt = i;
            // Handle backtracking to find if this quote is escaped (or, if the escape is escaping a slash)
            while (0 <= bt && text[bt] == '\\') {
                bt--;
            }
            if (isEven(i - bt)) {
                break;
            }
        }
        i++;
    }
    return i;
}
//# sourceMappingURL=json2path.js.map