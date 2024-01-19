// Storyline
// 1. Need to do data validation
import JustValidate from "just-validate";

const formEl = document.querySelector("#resourceForm");

const localStorageKey = "resourcesData";

const validator = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
});
// console.log(validator);

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

  const newResourceDataArray = [];

  //! Steps to Get the Values in Form
  //! 1. Get the form using FormData()
  const formData = new FormData(formEl);

  //! 2. Get the values from form using Object.fromEntries()
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);

  //! 3.Convert into string format
  const resourceStringObj = JSON.stringify(formDataObj);

  // 4. Store & Fetch the data from localStorage
  const existingResourceData = localStorage.getItem(localStorageKey); // String type data
  const existingResourceDataJsonObj = JSON.parse(existingResourceData); // Converted string data into JSON Object.

  if (existingResourceData) {
    existingResourceDataJsonObj.push(formDataObj);

    localStorage.setItem(
      localStorageKey,
      JSON.stringify(existingResourceDataJsonObj)
    );
  } else {
    newResourceDataArray.push(formDataObj);

    localStorage.setItem(localStorageKey, JSON.stringify(newResourceDataArray));
  }

  formEl.reset();
});

// 4. Show the fetched data in UI table format.
// 5. Show the report in report table.
