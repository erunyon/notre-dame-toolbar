nddotedutoolbar.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ nddotedutoolbar.showFirefoxContextMenu(e); }, false);
};

nddotedutoolbar.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-nddotedutoolbar").hidden = gContextMenu.onImage;
};

window.addEventListener("load", nddotedutoolbar.onFirefoxLoad, false);
