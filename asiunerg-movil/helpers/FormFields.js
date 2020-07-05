import { useState } from "react";

export const  useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(data) {
      setValues({
        ...fields,
        ...data
      });
    }
  ];
}