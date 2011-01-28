

var nddotedutoolbar = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    // this.strings = document.getElementById("nddotedutoolbar-strings");
		nddotedutoolbar.Populate();
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
  },

  onToolbarButtonCommand: function(e, item) {
    // just reuse the function above.  you can change this, obviously!
		console.log(item);
    nddotedutoolbar.onMenuItemCommand(e);
  },

  ////////////////////////////////////////////////////////////////////////////
  // The LoadURL() function loads the specified URL in the browser.
  ////////////////////////////////////////////////////////////////////////////
  LoadURL: function(url) {
		// Set the browser window's location to the incoming URL
		window.content.document.location = url;

		// Make sure that we get the focus
		window.content.focus();
  },

  ////////////////////////////////////////////////////////////////////////////
  // The TrimString() function will trim all leading and trailing whitespace
  // from the incoming string, and convert all runs of more than one
  // whitespace character into a single space. The new string gets returned.
  ////////////////////////////////////////////////////////////////////////////
  TrimString: function(string) {
      // If the incoming string is invalid, or nothing was passed in, return empty
      if (!string)
          return "";
  
      string = string.replace(/^\s+/, ''); // Remove leading whitespace
      string = string.replace(/\s+$/, ''); // Remove trailing whitespace
  
      // Replace all whitespace runs with a single space
      string = string.replace(/\s+/g, ' ');
  
      return string; // Return the altered value
  },

	////////////////////////////////////////////////////////////////////////////////
	// The Populate() function places dynamically generated menu items inside
	// our toolbar's search box drop-down menu. Although this sample isn't very
	// practical, it demonstrates how dynamic menu population works.
	////////////////////////////////////////////////////////////////////////////////
	Populate: function() {
	    // Get the menupopup element that we will be working with
	    var menu = document.getElementById("nddotedutoolbar-toolbar");

	    // Remove all of the items currently in the popup menu
	    for(var i=menu.childNodes.length - 1; i >= 0; i--) {
	        menu.removeChild(menu.childNodes.item(i));
	    }

	    // Specify how many items we should add to the menu
	    var numItemsToAdd = Items.length;

	    for(var i=0; i<numItemsToAdd; i++) {
				var item = Items[i];
				
				if(item.type == 'link') {
					// Create a new menu item to be added
					var tempItem = document.createElement("toolbarbutton");
					tempItem.setAttribute("label", item.label);
					tempItem.setAttribute("tooltiptext", item.label);
					tempItem.setAttribute("oncommand", "nddotedutoolbar.LoadURL('"+ item.href +"')");
					tempItem.setAttribute("class", "nddotedutoolbar-toolbar-button");
					menu.appendChild(tempItem);
				}
	    }
	}

};

window.addEventListener("load", nddotedutoolbar.onLoad, false);
