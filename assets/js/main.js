// Storyline
// 1. Need to do data validation
import JustValidate from "just-validate";

const formEl = document.querySelector("#resourceForm");
const mainEl = document.querySelector("#main-element");

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

  // 4. Show the fetched data in UI table format.
  displayResourcesInTable();
  formEl.reset();
});
displayResourcesInTable();

// 5. Show the report in report table.

// Todo: Need to Fetch the data from localStorage
function displayResourcesInTable() {
  // 4.1 Need to get the datas from localStorage
  const fetchedResourceDetails = localStorage.getItem(localStorageKey);
  const fetchedResourceObj = JSON.parse(fetchedResourceDetails);
  const finalRow = [];

  const tableDiv = document.createElement("div");
  const tableBodyEl = document.querySelector("#table-body");

  const editButtonEl = document.createElement("button");
  const deleteButtonEl = document.createElement("button");

  let serialNum = 1;

  fetchedResourceObj.map((element) => {
    const rowEl = document.createElement("tr");
    rowEl.classList.add("bg-[#5d5869]", "text-[#e1d8cf]", "text-center");

    const editButtonEl = document.createElement("button");
    const deleteButtonEl = document.createElement("button");

    const serialNumCell = document.createElement("td");
    serialNumCell.classList.add("p-3");
    serialNumCell.textContent = `#${serialNum++}`;
    rowEl.append(serialNumCell);

    const titleCell = document.createElement("td");
    titleCell.classList.add("p-3");
    titleCell.textContent = element.courseTitle;
    rowEl.append(titleCell);

    const typeCell = document.createElement("td");
    typeCell.classList.add("p-3");
    typeCell.textContent = element.contentType;
    rowEl.append(typeCell);

    const authorCell = document.createElement("td");
    authorCell.classList.add("p-3");
    authorCell.textContent = element.authorName;
    rowEl.append(authorCell);

    const lengthCell = document.createElement("td");
    lengthCell.classList.add("p-3");
    lengthCell.textContent = element.contentDuration;
    rowEl.append(lengthCell);

    const noteCell = document.createElement("td");
    noteCell.classList.add("p-3");
    noteCell.textContent = element.notes;
    rowEl.append(noteCell);

    const actionCell = document.createElement("td");
    actionCell.classList.add(
      "p-3",
      "text-center",
      "flex",
      "justify-center",
      "items-center",
      "gap-5"
    );

    editButtonEl.innerHTML = `<box-icon
    color="#e1d8cf"
    class="cursor-pointer hover:transition 500 hover:-translate-y-1"
    name="trash"
  ></box-icon>`;

    deleteButtonEl.innerHTML = `<box-icon
    color="#e1d8cf"
    class="cursor-pointer hover:transition 500 hover:-translate-y-1"
    type="solid"
    name="edit"
  ></box-icon>`;

    actionCell.append(editButtonEl);
    actionCell.append(deleteButtonEl);

    // Delete operation
    deleteButtonEl.addEventListener("click", () => deleteRecord(element));

    rowEl.append(actionCell);
    // console.log(element);
    finalRow.push(rowEl);
  });

  // 4.2 Display in UI
  finalRow.forEach((el) => tableBodyEl.append(el));
}

function deleteRecords(totalFetchedJsonData) {}
