import { FormSchema } from "../formTypes";

export const exampleFormSchema: FormSchema = {
  submit: "Create new project",
  fields: [
    {
      name: "projectName",
      type: "text",
      props: {
        placeholder: "Project name",
      },
    },
    {
      name: "projectCRUD",
      type: "textarea",
      props: {
        placeholder: "CRUD description (prefer in MARKDOWN)",
        rows: 16,
      },
    },
  ],
};

// export const exampleFormSchemaXXX: FormSchema = {
//   title: "Dynamic Form Example",
//   fields: [
//     {
//       name: "User",
//       type: "group",
//       label: "Preferencje",
//       fields: [
//         {
//           name: "FirstName",
//           type: "text",
//           label: "Imię",
//           required: true,
//         },
//         {
//           name: "LastName",
//           type: "text",
//           label: "Nazwisko",
//           required: true,
//         },
//         {
//           name: "Email",
//           type: "email",
//           label: "Email",
//           required: true,
//         },
//         {
//           name: "Password",
//           type: "password",
//           label: "Hasło",
//           required: true,
//         },
//       ],
//     },
//     {
//       name: "Address",
//       type: "textarea",
//       label: "Adres",
//       required: false,
//       props: {
//         rows: 20,
//       },
//       condition: { field: "IsActive", value: true },
//     },
//     {
//       name: "Allergies",
//       type: "checkbox-group",
//       label: "Alergie",
//       options: [
//         { label: "Orzechy", value: "nuts" },
//         { label: "Mleko", value: "dairy" },
//         { label: "Gluten", value: "gluten" },
//         { label: "Soja", value: "soy" },
//         { label: "Jaja", value: "eggs" },
//       ],
//     },
//     {
//       name: "Preferences",
//       type: "enum",
//       label: "Preferencje",
//       fields: [
//         {
//           name: "DietaryPreferences",
//           type: "text",
//           label: "Preferencje dietetyczne",
//           default: "aaaa",
//         },
//         {
//           name: "Allergies",
//           type: "checkbox-group",
//           label: "Alergie",
//           options: [
//             { label: "Orzechy", value: "nuts" },
//             { label: "Mleko", value: "dairy" },
//             { label: "Gluten", value: "gluten" },
//             { label: "Soja", value: "soy" },
//             { label: "Jaja", value: "eggs" },
//           ],
//         },
//         {
//           name: "User2",
//           type: "group",
//           label: "Preferencje",
//           fields: [
//             {
//               name: "a",
//               type: "text",
//               label: "a",
//               required: true,
//             },
//             {
//               name: "b",
//               type: "text",
//               label: "b",
//               required: true,
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: "IsActive",
//       type: "checkbox",
//       label: "Aktywny",
//       default: true,
//     },
//   ],
//   scope: [],
//   init: [],
//   process: [],
// };
