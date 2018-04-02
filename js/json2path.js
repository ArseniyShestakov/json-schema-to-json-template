/* Rewritten from https://github.com/nidu/vscode-copy-json-path */

exports.generatePath = generatePath;

function generatePath(text, offset) {
    let pos = 0;
    let stack = [];
    let isKeyRead = false;
    let stackTop;

    while (pos < offset) {
        const initPos = pos;

        switch (text[pos]) {
            case '"':
                let res = readString(text, pos);
                pos = res.pos;

                /* Get the value of key */
                stackTop = stack[stack.length - 1];
                if (stackTop.type === "object" && !isKeyRead) {
                    stackTop["key"] = res.text;
                    isKeyRead = true;
                }

                break;
            case '{': 
                stack.push({type: "object"});
                isKeyRead = false;
                break;
            case '}':
                stack.pop();
                break;
            case '[':
                stack.push({type: "array", index: 0});
                break;
            case ']': 
                stack.pop();
                break;
            case ',':
                stackTop = stack[stack.length - 1];
                if (stackTop.type === "array") {
                    stackTop.index++;
                } else if (stackTop.type === "object") {
                    isKeyRead = false;
                }
                break;
        }
        if (pos === initPos) {
            pos++;
        }
    }

    return stack;
}

function readString(text, pos) {
    const initPos = pos;
    pos = pos + 1;
    while(!(text[pos] == '"' && text[pos-1] != '\\')) {
        pos++;
    }

    return {text: text.substring(initPos + 1, pos), pos: pos + 1};
}