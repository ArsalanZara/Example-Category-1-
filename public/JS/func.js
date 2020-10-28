// functions

// adding a category to the json file and also update the table
function ajaxPost(category) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/", true);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      getData(getDataCallback);
    }
  };
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`category=${category}`);
}

//delete a category from the json file and also updates the page
function deleteCategory(index) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      getData(getDataCallback);
    }
  };
  xhr.open("GET", `/api/categories/delete/${index}`, true);
  xhr.send(null);
}

// updates the table
function getData(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/categories", true);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      document.querySelector(".items").innerHTML = "";

      let categories = JSON.parse(this.responseText);

      appendCategory(categories);
      cb();
    }
  };
  xhr.send(null);
}

// the function that updates the table
function appendCategory(categories) {
  for (let i = 0; i < categories.length; i++) {
    let tr = document.createElement("tr");
    tr.className = "row";
    //appending category field
    let td2 = document.createElement("td");
    td2.append(categories[i].category);
    tr.appendChild(td2);

    //appending delete icon
    let icon = document.createElement("i");
    let td1 = document.createElement("td");
    icon.className = "fa fa-trash delete-ico";
    td1.appendChild(icon);
    tr.appendChild(td1);

    //appending table tow to the table
    document.querySelector(".items").appendChild(tr);
  }
}

//gets called whenever categories are ready
function getDataCallback() {
  const rows = document.querySelectorAll(".row");
  for (let i = 0; i < rows.length; i++) {
    if (i % 2 == 0) rows[i].style.backgroundColor = "rgb(236, 234, 234)";
  }
  const deleteIcons = Array.from(document.querySelectorAll(".delete-ico"));
  for (let icon of deleteIcons) {
    icon.addEventListener("click", event => {
      deleteCategory(deleteIcons.indexOf(icon));
    });
  }
}
