//* Toggle switches
// Onthoud keuzes en stel instellingen in

// Highlighting bad grades
chrome.storage.local.get("negativeHighlight", function(items) {
	if (items["negativeHighlight"] == true) {
		document.getElementById("negativeGradeToggle").checked = true
	} 
})

document.getElementById("negativeGradeToggle").oninput = function () { toggleGradeHighlighting() };
function toggleGradeHighlighting() {
	chrome.storage.local.get("negativeHighlight", function(items) {
		if (items["negativeHighlight"] == true) {
			chrome.storage.local.remove(["negativeHighlight"])
		} else {
			save_content = {
				"negativeHighlight": true
			}
			chrome.storage.local.set(save_content)
		}
	})
}

function highlightStatus() {
	chrome.storage.local.get("negativeHighlight", function(items) {
		console.log(items["negativeHighlight"])
	});
}

// Showing average grade
chrome.storage.local.get("showAverageGrade", function(items) {
	if (items["showAverageGrade"] == true) {
		document.getElementById("totalAverageToggle").checked = true
	} 
})

document.getElementById("totalAverageToggle").oninput = function () { toggleAverage() };
function toggleAverage() {
	chrome.storage.local.get("showAverageGrade", function(items) {
		if (items["showAverageGrade"] == true) {
			chrome.storage.local.remove(["showAverageGrade"])
		} else {
			save_content = {
				"showAverageGrade": true
			}
			chrome.storage.local.set(save_content)
		}
	})
}

function averageStatus() {
	chrome.storage.local.get("showAverageGrade", function(items) {
		console.log(items["showAverageGrade"])
	});
}

// Custom theme
chrome.storage.local.get("customTheme", function(items) {
	if (items["customTheme"] == true) {
		document.getElementById("themeToggle").checked = true
	} 
})

document.getElementById("themeToggle").oninput = function () { toggleTheme() };
function toggleTheme() {
	chrome.storage.local.get("customTheme", function(items) {
		if (items["customTheme"] == true) {
			chrome.storage.local.remove(["customTheme"])
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.reload(tabs[0].id);
			});
		} else {
			save_content = {
				"customTheme": true
			}
			chrome.storage.local.set(save_content)
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.reload(tabs[0].id);
			});
		}
	})
}

function themeStatus() {
	chrome.storage.local.get("customTheme", function(items) {
		console.log(items["customTheme"])
	});
}

// Custom shortcuts
chrome.storage.local.get("shortcuts", function(items) {
	if (items["shortcuts"] == true) {
		document.getElementById("shortcutToggle").checked = true
	} 
})

document.getElementById("shortcutToggle").oninput = function () { toggleShortcuts() };
function toggleShortcuts() {
	chrome.storage.local.get("shortcuts", function(items) {
		if (items["shortcuts"] == true) {
			chrome.storage.local.remove(["shortcuts"])
		} else {
			save_content = {
				"shortcuts": true
			}
			chrome.storage.local.set(save_content)
		}
	})
}

function shortcutsStatus() {
	chrome.storage.local.get("shortcuts", function(items) {
		console.log(items["shortcuts"])
	});
}
