import { FormField } from "./formTypes";

export const handleFieldChange = (path: string[], value: any, state: any[]) => {
  let data = { ...state[0] };
  path.reduce((acc, key, idx) => {
    if (idx === path.length - 1) {
      acc[key] = value;
    } else {
      acc[key] = acc[key] || (typeof path[idx + 1] === "number" ? [] : {});
    }
    return acc[key];
  }, data);
  state[1](data);
};

export const handleCheckboxChange = (
  path: string[],
  checked: boolean,
  state: any[]
) => {
  const newData = { ...state[0] };

  // Update the nested state to reflect the checkbox's checked state
  path.reduce((acc, key, idx) => {
    if (idx === path.length - 1) {
      acc[key] = checked;
    } else {
      if (!acc[key]) acc[key] = {};
      acc = acc[key];
    }
    return acc;
  }, newData);
  state[1](newData);
};

export const handleAddEnumField = (path: string[], state: any[]) => {
  let schema = { ...state[0] };
  for (let i = 0; i < path.length; i++) {
    const cur = path[i];
    if (!schema[cur]) schema[cur] = i === path.length - 1 ? [] : {};
    schema = schema[cur];
  }
  if (Array.isArray(schema)) {
    schema.push({});
  } else {
    console.error("Expected an array to push to, but found:", schema);
  }
  state[1]({ ...state[0] });
};

export const handleRemoveEnumField = (
  path: string[],
  index: number,
  state: any[]
) => {
  const schema = path.reduce((acc, cur) => acc[cur], { ...state[0] });
  schema.splice(index, 1);
  state[1]({ ...state[0] });
};

export const checkCondition = (state: any[],condition?: { field: string; value: any }) => {
  if (!condition) return true;
  const conditionFieldValue = condition.field
    .split(".")
    .reduce((acc, cur) => acc[cur], state[0]);

  if (Array.isArray(conditionFieldValue)) {
    return conditionFieldValue.includes(condition.value);
  }
  return conditionFieldValue === condition.value;
};

export const initializeFormData = (fields: FormField[]): Record<string, any> => {
    return fields.reduce<Record<string, any>>((acc, field) => {
      if (field.type === "enum") {
        acc[field.name] = [];
      } else if (field.type === "group") {
        acc[field.name] = initializeFormData(field.fields);
      } else {
        acc[field.name] = "";
      }
      return acc;
    }, {});
  };
