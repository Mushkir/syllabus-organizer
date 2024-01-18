// Storyline
// 1. Need to do data validation
import JustValidate from "just-validate";

const formEl = document.querySelector("#resourceForm");
console.log(formEl);
const validator = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
});
console.log(validator);

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
      value: 30,
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
  "#cont-type",
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

validator.addField(
  "#content-notes",
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
// 2. Get the data from input
validator.onSuccess(() => {
  // e.preventDefault();

  const formData = new FormData(formEl);
  const newForm = Object.fromEntries(formData.entries());
  console.log(newForm);
});
// 3. Store the data in localStorage
// 4. Fetch the data from localStorage
// 5. Show the fetched data in UI table format.
// 6. Show the report in report table.
