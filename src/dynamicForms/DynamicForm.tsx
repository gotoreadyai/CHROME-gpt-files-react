import React, { useEffect, useState } from "react";
import { exampleFormSchema } from "./schemas/exampleForm";
import { renderField } from "./renderHelper";

import { initializeFormData } from "./formHelpers";
import { app_style } from "../appStyles";

export type UnObj = Record<string, any>;
type DynamicFormProps = {
  onProcess: (data: any) => void;
  setDefault?: UnObj;
};

const DynamicForm: React.FC<DynamicFormProps> = ({
  onProcess,
  setDefault,
}: any) => {
  const formSchema = exampleFormSchema;

  const [formData, setFormData] = useState<Record<string, any>>({});
  useEffect(() => {
    initializeFormData(formSchema.fields);
    setDefault && setFormData(setDefault);
  }, [formSchema.fields]);

  return (
    <form
      className={app_style.primary.form.form}
      onSubmit={(e) => {
        e.preventDefault();
        onProcess(formData);
      }}
    >
      {formSchema.title && <h1>{formSchema.title}</h1>}
      {formSchema.fields.map((field) =>
        renderField(field, [field.name], formData, setFormData)
      )}
      <button className={app_style.primary.nav.buttonPrimary} type="submit">
        {formSchema.submit || "Submit"}
      </button>
    </form>
  );
};

export default DynamicForm;
