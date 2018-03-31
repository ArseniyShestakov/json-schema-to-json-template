exports.generateTemplate = generateTemplate;

function generateTemplate(schema) {
    if (schema === undefined) {
      return null;
    }
  
    let type = schema["type"];
  
    if (type === "object") {
      let obj = {};
  
      Object.keys(schema["properties"]).forEach(function(key) {
          let template = generateTemplate(schema["properties"][key]);
          if (template !== null) {
              obj[key] = template;
          }
      });
  
      return obj;
    }
  
    else if (type === "array") {
      let arr = [];
      let template = generateTemplate(schema["items"]);
      if (template !== null) {
          arr.push(template);
      }
      return arr;
    }
  
    else {
      if (type === "boolean") {
        return "false";
      }
  
      else {
        return "TODO";
      }
    }
  }