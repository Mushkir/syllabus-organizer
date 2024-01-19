// Storyline
// 1. Need to do data validation
import JustValidate from "just-validate";
import { v4 as uuidv4 } from "uuid";

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
  //! Steps to Get the Values in Form
  //! 1. Get the form using FormData()
  const formData = new FormData(formEl);

  formData.append("id", uuidv4());

  //! 2. Get the values from form using Object.fromEntries()
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);

  const newResourceDataArray = [];

  //! 3.Convert into string format
  const resourceStringObj = JSON.stringify(formDataObj);

  // 3. Store & Fetch the data from localStorage
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
  displaySummaryOfRecords();

  formEl.reset();
});

displayResourcesInTable();
displaySummaryOfRecords();

// 5. Show the report in report table.

// Todo: Need to Fetch the data from localStorage
function displayResourcesInTable() {
  // 4.1 Need to get the datas from localStorage
  const fetchedResourceDetails = localStorage.getItem(localStorageKey);
  const fetchedResourceObj = JSON.parse(fetchedResourceDetails);

  const tableBodyEl = document.querySelector("#table-body");

  if (fetchedResourceObj && fetchedResourceObj.length > 0) {
    tableBodyEl.innerHTML = "";

    const finalRow = [];

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

      deleteButtonEl.innerHTML = `<box-icon
      color="#e1d8cf"
      class="cursor-pointer hover:transition 500 hover:-translate-y-1"
      name="trash"
    ></box-icon>`;

      editButtonEl.innerHTML = `<box-icon
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
}

// Function for delete process
function deleteRecord(totalFetchedJsonData) {
  const confirmDelete = confirm(
    `As a final verification, would you like to delete ${totalFetchedJsonData.courseTitle} permenantly?`
  );

  if (confirmDelete) {
    const existingResourcesStringData = localStorage.getItem(localStorageKey);
    let existingResourceJsonData = JSON.parse(existingResourcesStringData);

    const filteredResources = existingResourceJsonData.filter((data) => {
      return data.id != totalFetchedJsonData.id;
    });

    existingResourceJsonData = filteredResources;
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(existingResourceJsonData)
    );
    console.log(filteredResources);
  }
  displayResourcesInTable();
  displaySummaryOfRecords();
}

// Function for display summary
// ...

// Function for display summary
// Dynamcially Get the Types and Make them as Object
// function displaySummaryOfRecords() {
//   const existingResourceData = localStorage.getItem(localStorageKey);
//   const existingResourceDataObj = JSON.parse(existingResourceData);

//   const summaryTableBodyEl = document.querySelector("#summary-table-body");
//   let serialNo = 1;

//   if (existingResourceDataObj && existingResourceDataObj.length > 0) {
//     summaryTableBodyEl.innerHTML = "";

//     // Dynamic function to calculate resource summary
//     function calculateResourceSummary(resourceData) {
//       const summary = {};

//       resourceData.forEach((element) => {
//         const contentType = element.contentType;
//         if (summary[contentType]) {
//           summary[contentType]++;
//         } else {
//           summary[contentType] = 1;
//         }

//         console.log(summary);
//       });

//       return Object.entries(summary).map(([resourceName, count]) => ({
//         resourceName,
//         count,
//       }));
//     }

//     const resourceSummary = calculateResourceSummary(existingResourceDataObj);
//     console.log(resourceSummary);

//     const newObject = resourceSummary.map((element) => {
//       const tblRowEl = document.createElement("tr");
//       tblRowEl.classList.add("bg-tableSecondary", "text-textSecondary");

//       const serialNumberCell = document.createElement("td");
//       serialNumberCell.classList.add("p-3");
//       serialNumberCell.textContent = `${serialNo++}`;
//       tblRowEl.append(serialNumberCell);

//       const resourceTypeCell = document.createElement("td");
//       resourceTypeCell.classList.add("p-3");
//       resourceTypeCell.textContent = element.resourceName;
//       tblRowEl.append(resourceTypeCell);

//       const resourceCountCell = document.createElement("td");
//       resourceCountCell.classList.add("p-3");

//       element.count < 10
//         ? (resourceCountCell.textContent = `0${element.count}`)
//         : (resourceCountCell.textContent = element.count);

//       tblRowEl.append(resourceCountCell);

//       return tblRowEl;
//     });

//     newObject.forEach((element) => summaryTableBodyEl.append(element));
//   }
// }

// ...

function displaySummaryOfRecords() {
  const existingResourceData = localStorage.getItem(localStorageKey);
  const existingResourceDataObj = JSON.parse(existingResourceData);

  existingResourceDataObj.forEach((element) => {
    console.log(element.contentType);
  });

  const summaryTableBodyEl = document.querySelector("#summary-table-body");
  let serialNo = 1;
  const newObject = [];

  if (existingResourceDataObj && existingResourceDataObj.length > 0) {
    summaryTableBodyEl.innerHTML = "";
    // Finding Total Video Category
    const totalVideoResources = existingResourceDataObj.filter(
      (element) => element.contentType == "video"
    ).length;

    // Finding Total PDF Category
    const totalPdfResources = existingResourceDataObj.filter(
      (element) => element.contentType == "pdf"
    ).length;

    // Finding Total Book Category
    const totalBookResources = existingResourceDataObj.filter(
      (element) => element.contentType == "book"
    ).length;

    // Finding Total Journal Article Category
    const totalJournalArticleResources = existingResourceDataObj.filter(
      (element) => element.contentType == "journal-article"
    ).length;

    const resourceSummary = [
      {
        resourceName: "Book",
        count: totalBookResources,
      },
      {
        resourceName: "PDF",
        count: totalPdfResources,
      },
      {
        resourceName: "Journal Article",
        count: totalJournalArticleResources,
      },
      {
        resourceName: "Video",
        count: totalVideoResources,
      },
    ];

    resourceSummary.map((element) => {
      console.log(element);

      const tblRowEl = document.createElement("tr");
      tblRowEl.classList.add("bg-tableSecondary", "text-textSecondary");

      const serialNumberCell = document.createElement("td");
      serialNumberCell.classList.add("p-3");
      serialNumberCell.textContent = `#${serialNo++}`;
      tblRowEl.append(serialNumberCell);

      const resourceTypeCell = document.createElement("td");
      resourceTypeCell.classList.add("p-3");
      resourceTypeCell.textContent = element.resourceName;
      tblRowEl.append(resourceTypeCell);

      const resourceCountCell = document.createElement("td");
      resourceCountCell.classList.add("p-3");

      element.count < 10
        ? (resourceCountCell.textContent = `0${element.count}`)
        : (resourceCountCell.textContent = element.count);
      // resourceCountCell.textContent = element.count;
      tblRowEl.append(resourceCountCell);

      newObject.push(tblRowEl);
    });

    newObject.forEach((element) => summaryTableBodyEl.append(element));
  }
}
