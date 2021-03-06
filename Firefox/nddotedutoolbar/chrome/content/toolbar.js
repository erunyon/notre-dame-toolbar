// Get the "extensions.myext." branch
var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var usrprefs = prefs.getBranch("extensions.nddotedutoolbar.");
var defprefs = prefs.getDefaultBranch("extensions.nddotedutoolbar.");
// var value = prefs.getBoolPref("typeaheadfind"); // get a pref (accessibility.typeaheadfind)
// prefs.setBoolPref("typeaheadfind", !value); // set a pref (accessibility.typeaheadfind)

var nddotedutoolbar = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    // this.strings = document.getElementById("nddotedutoolbar-strings");
		nddotedutoolbar.Populate();
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
				// if(defprefs.getBoolPref(item.id == true)) {
					// Create a new menu item to be added
					var tempItem = document.createElement("toolbarbutton");
					tempItem.setAttribute("label", item.label);
					tempItem.setAttribute("tooltiptext", item.label);
					tempItem.setAttribute("oncommand", "nddotedutoolbar.LoadURL('"+ item.href +"')");
					tempItem.setAttribute("class", "nddotedutoolbar-toolbar-button");
					menu.appendChild(tempItem);
				// }
			} else {
				if(item.id == 'tool_search') {
					var tempItem = document.createElement("textbox");
					tempItem.setAttribute("placeholder", "Search ND.edu");
					tempItem.setAttribute("type", "search");
					tempItem.setAttribute("id", "tool_search");
					tempItem.setAttribute("searchbutton", true);
					tempItem.setAttribute("oncommand", "nddotedutoolbar.Search(event)");
					menu.appendChild(tempItem);
				}
			}
    }
	},
	
	Search: function() {
		// Get a handle to our search terms box (the <menulist> element)
    var searchTermsBox = document.getElementById("tool_search");
    var searchTerms = this.TrimString(searchTermsBox.value);

		url = "http://search.nd.edu/search?proxystylesheet=default_frontend&q=" + searchTerms;
		this.LoadURL(url);
	}

};

window.addEventListener("load", nddotedutoolbar.onLoad, false);

function PrefListener(branchName, func) {
    var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefService);
    var branch = prefService.getBranch(branchName);
    branch.QueryInterface(Components.interfaces.nsIPrefBranch2);

    this.register = function() {
        branch.addObserver("", this, false);
        branch.getChildList("", { })
              .forEach(function (name) { func(branch, name); });
    };

    this.unregister = function unregister() {
        if (branch)
            branch.removeObserver("", this);
    };

    this.observe = function(subject, topic, data) {
        if (topic == "nsPref:changed")
            func(branch, data);
    };
}

var myListener = new PrefListener("extensions.nddotedutoolbar.",
	function(branch, name) {
		nddotedutoolbar.onLoad();
		// switch (name) {
		//     case "pref1":
		//         // extensions.myextension.pref1 was changed
		//         break;
		//     case "pref2":
		//         // extensions.myextension.pref2 was changed
		//         break;
		// }
});
myListener.register();