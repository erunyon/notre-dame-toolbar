var menu = document.getElementById("checkboxes");
for(var i=0; i<Items.length; i++) {
  var item = Items[i];
  var tempItem = document.createElement("checkbox");
  tempItem.setAttribute("id", item.id);
  tempItem.setAttribute("preference", true);
  tempItem.setAttribute("label", item.label);
  tempItem.setAttribute("checked", item.default);
  menu.appendChild(tempItem);
}