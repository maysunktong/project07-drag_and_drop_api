const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const programmingLangs = [
  {
    id: 1,
    name: "C",
    year: 1972,
  },
  {
    id: 2,
    name: "C++",
    year: 1980,
  },
  {
    id: 3,
    name: "Python",
    year: 1990,
  },
  {
    id: 4,
    name: "R",
    year: 1993,
  },
  {
    id: 5,
    name: "Java",
    year: 1995,
  },
  {
    id: 6,
    name: "C#",
    year: 2001,
  },
  {
    id: 7,
    name: "Rust",
    year: 2010,
  },
  {
    id: 8,
    name: "TypeScript",
    year: 2012,
  },
  {
    id: 9,
    name: "Swift",
    year: 2014,
  },
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  const placeRandomly = programmingLangs.map((language) => {
    const eachLanguage = {
      /* Add year, and change value to name */
      id: language.id,
      name: language.name,
      year: language.year,
      sortOrder: Math.random(),
    };
    console.log("Each lang", eachLanguage);
    return eachLanguage;
  });

  const sortedList = placeRandomly.sort((a, b) => {
    return a.sortOrder - b.sortOrder;
  });

  console.log("SORTEDLIST", sortedList);

  const sortedListValues = sortedList.map((language) => {
    return {
      id: language.id,
      name: language.name,
      year: language.year,
    };
  });

  console.log("Sortedlistvalues", sortedListValues);

  sortedListValues.forEach((language, index) => {
    const listItem = document.createElement("li");

    listItem.setAttribute("data-index", index);

    listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="language-name">${language.name}</p>
          <p class="language-year">${language.year}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

    listItems.push(listItem);

    draggableList.appendChild(listItem);
  });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add("over");
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove("over");
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const languageYear = listItem
      .querySelector(".language-year")
      .innerText.trim();

    console.log("LAN YEAR", languageYear);

    if (languageYear !== programmingLangs[index].year.toString()) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
