# JSON Schema To JSON Template

## Features

Tool to generate JSON template from json schema.

![DEMO](https://github.com/ChaunceyKiwi/json-schema-to-json-template/blob/master/demo.gif)

## Requirement
* Follow instructions on `https://code.visualstudio.com/docs/languages/json` to set up json schema files.
* JSON schema file should exist on the path: `schema/schema-root.json`. Include required schema files as well if there exist any references in root schema file. E.g.
    ```
    {
        "json.schemas": [
            {
                "fileMatch": ["/*.json"],
                "url": "./schema/schema-root.json"
            },
            {
                "fileMatch": ["/*.json"],
                "url": "./schema/schema-*****.json"
            }
        ]
    }
    ```

## Usage
* Move the cursor to where you want to insert a JSON template.
* Press `cmd+shift+p` and select the entry `Generate template from schema` to generate template.

## Known Issues
* Executing plugin in an empty object will not generate template, since it does not know the json path it is in.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release