// Storyline
// 1. Need to do data validation
import JustValidate from "just-validate";
import { Rule } from "postcss";

const validator = new JustValidate("#resource-form", {
  validateBeforeSubmitting: true,
});

validator.addField(
  "#course-title",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 15,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
    errorLabelStyle: {
      color: "#ffb2b2",
    },
  }
);

validator.addField(
  "#contentType",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
    errorLabelStyle: {
      color: "#ffb2b2",
    },
  }
);

validator.addField(
  "#author",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
    errorLabelStyle: {
      color: "#ffb2b2",
    },
  }
);

validator.addField(
  "#content-duration",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 5,
    },
    {
      rule: "maxLength",
      value: 5,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
    errorLabelStyle: {
      color: "#ffb2b2",
    },
  }
);

// 2. Get the data from input

// 3. Store the data in localStorage
// 4. Fetch the data from localStorage
// 5. Show the fetched data in UI table format.
// 6. Show the report in report table.
