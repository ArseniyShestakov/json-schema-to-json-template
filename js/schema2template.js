exports.generateTemplate = generateTemplate;

function generateTemplate(schema, level) {
    if (level === 0 || schema === undefined) {
      return null;
    }
  
    let type = schema["type"];
  
    if (type === "object") {
      let obj = {};

      let properties;
      if ("properties" in schema) {
        properties = schema.properties;
      } else if ("patternProperties" in schema) {
        properties = schema.patternProperties;
      }
  
      Object.keys(properties).forEach(function(key) {
          let template = generateTemplate(properties[key], level === -1? -1 : level - 1);
          if (template !== null) {
              obj[key] = template;
          }
      });
  
      return obj;
    }
  
    else if (type === "array") {
      let arr = [];
      let template = generateTemplate(schema["items"], level === -1? -1 : level);
      if (template !== null) {
          arr.push(template);
      }
      return arr;
    }
  
    else {
      if (type === "boolean") {
        return "__TODO__";
      }
  
      else {
        return "__TODO__";
      }
    }
  }