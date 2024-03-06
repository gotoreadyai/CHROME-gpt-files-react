// import { Editor } from "@monaco-editor/react";

import {
  checkCondition,
  handleAddEnumField,
  handleFieldChange,
  handleRemoveEnumField,
} from "./formHelpers";

import { FormField } from "./formTypes";
import { app_style } from "../appStyles";

export const renderField = (
  field: FormField,
  path: string[] = [],
  formData: any,
  setFormData: any
): JSX.Element => {
  if (!checkCondition([formData, setFormData], field.condition)) {
    return <></>;
  }

  let inputValue = path.reduce((acc: any, cur) => acc && acc[cur], formData);
  if (inputValue === undefined) {
    inputValue = field.default !== undefined ? field.default : inputValue;
  }

  const classMix = (field: any) =>
    `${app_style.primary.form.input}  ${
      field?.props?.className ? " " + field.props.className : ""
    }`;

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return (
        <div className={app_style.primary.form.field} key={field.name}>
          {field.label && <label>{field.label}</label>}
          <input
            {...field.props}
            className={classMix(field)}
            type={field.type}
            name={field.name}
            value={inputValue || ""}
            onChange={(e) =>
              handleFieldChange(path, e.target.value, [formData, setFormData])
            }
          />
        </div>
      );
    case "textarea":
      return (
        <div className={app_style.primary.form.field} key={field.name}>
          {field.label && <label>{field.label}</label>}
          <textarea
            {...field.props}
            className={classMix(field)}
            name={field.name}
            value={inputValue || ""}
            onChange={(e) =>
              handleFieldChange(path, e.target.value, [formData, setFormData])
            }
          />
        </div>
      );
    case "code":
      return (
        <div>
          {/* <Editor
            options={{ padding: { top: 10 } }}
            height={"40vh"}
            defaultLanguage="json"
            value={inputValue || ""}
            onChange={(e) =>
              handleFieldChange(path, e, [formData, setFormData])
            }
            theme="vs-dark"
          /> */}
          Monaco have problem to run full local!
        </div>
      );
    case "select":
      return (
        <div key={field.name}>
          {field.label && <label>{field.label}</label>}
          <select
            {...field.props}
            className={classMix(field)}
            name={field.name}
            value={inputValue || ""}
            onChange={(e) =>
              handleFieldChange(path, e.target.value, [formData, setFormData])
            }
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "checkbox":
      return (
        <div key={field.name}>
          <label>
            <input
              type="checkbox"
              name={field.name}
              defaultChecked={!!inputValue} // Use double negation to convert truthy/falsy values to boolean
              onChange={(e) =>
                handleFieldChange(path, e.target.checked, [
                  formData,
                  setFormData,
                ])
              } // Update the form state based on checkbox state
            />
            {field.label}
          </label>
        </div>
      );
    case "checkbox-group":
      return (
        <div key={field.name}>
          <label>{field.label}</label>

          {field?.options.length &&
            field.options.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  name={`${field.name}[${option.value}]`}
                  checked={
                    inputValue ? inputValue.includes(option.value) : false
                  }
                  onChange={(e) => {
                    const set = new Set(inputValue || []);
                    if (e.target.checked) {
                      set.add(option.value);
                    } else {
                      set.delete(option.value);
                    }
                    handleFieldChange(path, Array.from(set), [
                      formData,
                      setFormData,
                    ]);
                  }}
                />
                {option.label}
              </label>
            ))}
        </div>
      );
    case "enum":
      return (
        <div key={field.name}>
          {/* // enum group label */}
          {field.label && <label>{field.label}</label>}
          <div className={app_style.primary.form.enumRowsFrame}>
            {inputValue?.length &&
              inputValue.map((_: any, i: number) => (
                <div key={i} className={app_style.primary.form.enumRow}>
                  {field.fields.map((subField) =>
                    renderField(
                      subField,
                      [...path, i.toString(), subField.name],
                      formData,
                      setFormData
                    )
                  )}
                  <button
                    className={app_style.primary.nav.buttonPrimary}
                    type="button"
                    onClick={() =>
                      handleRemoveEnumField(path, i, [formData, setFormData])
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <button
            className="border rounded p-2"
            type="button"
            onClick={() => handleAddEnumField(path, [formData, setFormData])}
          >
            Add More
          </button>
        </div>
      );
    case "group":
      return (
        <fieldset className={app_style.primary.form.fieldset} key={field.name}>
          <legend>{field.label}</legend>
          {field.fields.map((subField) =>
            renderField(
              subField,
              [...path, subField.name],
              formData,
              setFormData
            )
          )}
        </fieldset>
      );
    default:
      return <div>Unsupported field type</div>;
  }
};
