window.onload = function() {
  getData(getDataCallback);
};

const form = document.querySelector("form");
// table background color

//input clear icon
form.lastElementChild.addEventListener("click", () => {
  form.children[1].value = "";
});

//Ajax post , add category
form.addEventListener("submit", event => {
  event.preventDefault();
  let category = form.children[1].value;
  form.children[1].value = "";
  if (category != "") ajaxPost(category);
});

// trash icon handling
