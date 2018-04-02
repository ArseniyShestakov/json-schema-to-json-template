const vscode = require('vscode');
const fs = require('fs');

exports.generateSchema = generateSchema;

function generateSchema(path)
{
    let root_schema_path = vscode.workspace.rootPath + "/schema/schema-root.json";
    let root_schema = JSON.parse(fs.readFileSync(root_schema_path, 'utf8'));
    let sub_schema = getSchemaByPath(root_schema, path);

    return sub_schema;
}

function getSchemaByPath(schema, path) 
{
    if ("$ref" in schema) {
        let ref = schema["$ref"].split('#');
        let schema_file_name = ref[0];
        let schema_path = ref[1];
        let sub_schema_path = vscode.workspace.rootPath + "/schema/" + schema_file_name;
        let sub_schema_root = JSON.parse(fs.readFileSync(sub_schema_path, 'utf8'));;
        let sub_schema = getJSONByPath(sub_schema_root, schema_path);
        
        return getSchemaByPath(sub_schema, path);
    }

    else if (path.length === 0) {
        return schema;
    }

    else if (schema["type"] === "object") {
        if (path[0].type === "object") {
            return getSchemaByPath(schema["properties"][path[0].key], path.slice(1));
        } 
    }

    else if (schema["type"] === "array") {
        if (path[0].type === "array") {
            return getSchemaByPath(schema["items"], path.slice(1));
        }
    }

    else {
        return "";
    }
}

function getJSONByPath(json, path)
{
    let paths = path.split('/');
    for (let i = 0; i < paths.length; i++) {
        if (paths[i] !== '') {
            json = json[paths[i]];
        }
    }
    return json;
}