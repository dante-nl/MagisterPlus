chrome.tabs.onReplaced.addListener(function() {
	chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
		thisTab = tabs[0]
		items = await chrome.storage.local.get();
		if(items["customTheme"] == true) {
			chrome.scripting.insertCSS({
				files: ["magister+.css"],
				target: {
					tabId: thisTab.id,
					allFrames: true
				}
			});
		}
		if(thisTab.url.includes("/cijfers/cijferoverzicht")) {
			chrome.scripting.executeScript({
				func: highlightGrades,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
			chrome.scripting.executeScript({
				func: totalAverageGrades,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
		} else if(thisTab.url.includes("/vandaag")) {
			chrome.scripting.executeScript({
				func: showAdvertisement,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
		} else if(thisTab.url.endsWith("/agenda")) {
			chrome.scripting.executeScript({
				func: generateIDs,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
		}
	})
})

chrome.tabs.onUpdated.addListener(function() {
	chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
		thisTab = tabs[0]
		// applyBlock(thisTab)
		items = await chrome.storage.local.get();
		if(items["customTheme"] == true) {
			chrome.scripting.insertCSS({
				files: ["magister+.css"],
				target: {
					tabId: thisTab.id,
					allFrames: true
				}
			});
		}
		if(thisTab.url.includes("/cijfers/cijferoverzicht")) {
			chrome.scripting.executeScript({
				func: highlightGrades,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
			chrome.scripting.executeScript({
				func: totalAverageGrades,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
		} else if(thisTab.url.includes("/vandaag")) {
			chrome.scripting.executeScript({
				func: showAdvertisement,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
		} else if(thisTab.url.endsWith("/agenda")) {
			chrome.scripting.executeScript({
				func: generateIDs,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
		}
	})
})

chrome.webNavigation.onCompleted.addListener(function(tabId, tab) {
	// if (tab.frameId === 0) {
		// your script here
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		thisTab = tabs[0]

		if(thisTab.url.includes("/cijfers/cijferoverzicht")) {
			chrome.scripting.executeScript({
				func: highlightGrades,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
			chrome.scripting.executeScript({
				func: totalAverageGrades,
				target: {
					tabId: thisTab.id,
					allFrames: true
				},
				injectImmediately: false,
				// args: [changeInfo],
			})
		}
	})
});


async function highlightGrades() {
	// console.log(changeInfo["status"])
	// console.log(changeInfo.status)
	// if(changeInfo["status"] == "complete") {
		// alert("Executing script")
		items = await chrome.storage.local.get();
		if(items["negativeHighlight"] == true) {
			var intervalId = setInterval(function(){
				if(document.querySelector(".grade")){
					clearInterval(intervalId);
					// your script here
					var gradesGrid = document.getElementsByClassName("grade");
					if (gradesGrid.length > 0) {
						// elements with class "snake--mobile" exist
						var grades = document.getElementsByClassName("grade");
						grades_negative = 0;
						grades_positive = 0;
						averages_negative = 0;
						for (var i = 0; i < grades.length; i++) {
							if(document.getElementsByClassName("grade")[i].innerText.replace(",", ".") <= 5.4 
								&& !isNaN(parseInt(document.getElementsByClassName("grade")[i].innerText)) 
								&& !document.getElementsByClassName("grade")[i].classList.contains("gemiddelde_column")
								&& document.getElementsByClassName("grade")[i].id.replace(/\D/g,"") < 301301 == false
							) {
								document.getElementsByClassName("grade")[i].style.setProperty("background-color", "#ffc4c4", "important");
								grades_negative++;
								if(document.getElementsByClassName("grade")[i].classList.contains("gemiddeldecolumn")) {
									averages_negative++;
								}
							} else if(!isNaN(parseInt(document.getElementsByClassName("grade")[i].innerText))) {
								grades_positive++;
							}
						}
					}
				}
			}, 100);
		}
		
		// 	alert("Loaded!")
		// 	} else {
			// 		highlightGrades()
			// 		return
			// 	}
			// } else {
				// 	highlightGrades(changeInfo)
				// 	return
				
			}
			
async function totalAverageGrades() {
	items = await chrome.storage.local.get();
	if(items["showAverageGrade"] == true) {
		var intervalId = setInterval(function(){
			if(document.querySelector(".grade")){
				clearInterval(intervalId);
				// your script here
				// alert(1)
				var gradesGrid = document.getElementsByClassName("grade");

				try {
					HTMLAdded
				} catch(e) {
					HTMLAdded = false
				}
				if (gradesGrid.length > 0) {
					if(HTMLAdded == false) {
						var grades = document.getElementsByClassName("grade");
						var grades_average = []
						for (var i = 0; i < grades.length; i++) {
							if(!isNaN(parseInt(document.getElementsByClassName("grade")[i].innerText)) 
								&& !document.getElementsByClassName("grade")[i].classList.contains("gemiddelde_column")
								&& document.getElementsByClassName("grade")[i].id.replace(/\D/g,"") < 301301 == false
							) {
								grades_average.push(parseInt(document.getElementsByClassName("grade")[i].innerText))
							}
						}
						var grade_average = 0
						grades_average.forEach(grade => {
							grade_average = grade_average + grade
						});

						var grade_average = Math.round((grade_average / grades_average.length) * 10) / 10
						// console.info(`Cijfers gehighlight. ${grades_negative} onvoldoendes totaal, ${averages_negative} daarvan zijn in je gemiddelde en ongeveer ${Math.floor(averages_negative / 2)} cijfers waar je aandacht aan moet besteden. Je hebt ${grades_positive} voldoendes en je totale gemiddelde is een ${grade_average}`)
						average = grade_average
						HTMLAdded = true
						console.log(document.getElementsByTagName("tbody"))
						document.getElementsByTagName("tbody")[0].innerHTML += `
						<tr data-uid="ae477c4b-83f8-49f7-aeba-6c435f27218b" role="row">
							<td style="display:none" role="gridcell">11</td>
							<td role="gridcell">    
								<span title="Gemiddelde totaal" class="text">Gemiddelde totaal</span>
							</td>
							<td role="gridcell" class="k-state-selected" aria-selected="true">
								<span id="undefined_301_301" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="undefined_302_302" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="undefined_311_311" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="undefined_312_312" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="undefined_321_321" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="undefined_331_331" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="NE_900_900" title="${Math.round(average)}" class="grade gemiddeldecolumn mg+-average" style="background-color: #c4f4ff !important;">${Math.round(average)}</span>
							</td>
							<td role="gridcell">
								<span id="NE_901_901" title="${average}" class="grade gemiddeldecolumn mg+-average" style="background-color: #c4f4ff !important;">${average}</span>
							</td>
							<td role="gridcell">
								<span id="undefined_11_11" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="undefined_12_12" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="undefined_198_198" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span id="undefined_298_298" title="" class="grade empty">&nbsp;</span>
							</td>
							<td role="gridcell">
								<span class="text">&nbsp;</span>
							</td>
						</tr>`
					}
				}
			}
		}, 100);
	}
}

function showAdvertisement() {
	var intervalId = setInterval(function(){
		if(document.querySelector(".content-container")){
			clearInterval(intervalId);
			// your script here
			// alert(1)
			var todayGrid = document.getElementsByClassName("content-container");


			try {
				document.getElementById("mg+_version_string").innerHTML
				adAdded = true
			} catch(e) {
				adAdded = false
			}

			if (todayGrid.length > 0) {
				if(adAdded == false) {
					adAdded = true
					html = `
						<div data-ng-repeat="column in columns" id="column2" class="widget-column ng-scope">
							<div id="drop-2-0" class="droppable ng-isolate-scope ng-hide" data-sm-drag-drop="{drop: true}" data-drag-enabled="editMode" data-drop="handleDrop" data-ng-show="editMode" data-role="droptarget"></div>
							<div data-ng-repeat="widget in columnedWidgets[column.order] | orderBy:'Positie.Volgnummer'" class="ng-scope">
								<div id="drag-2-0" data-sm-drag-drop="{drag: true}" data-drag-enabled="editMode" data-hint-element="createHintElement" data-start-drag="dragStartExistingWidget(widget)" data-drag-end="dragEndExistingWidget()" class="ng-isolate-scope" data-role="draggable">
									<div ng-class="{'draggable-overlay draggable': editMode}">
										<div id="magister+" class="widget-high widget ng-scope agenda-widget" magister+-ad="" data-ng-init="widgetHigh = true">
											<div class="block grade-widget ng-isolate-scope" data-sm-loading-indicator="{domain: 'aanmeldingen', overlay: false, timeout: 1000}">
												<h3 data-ng-if="showLaatsteCijfers()" class="ng-scope">
													<span class="iconic resize-button ng-scope" data-ng-click="resize()" data-widget-resize-button="" data-widget-name="cijfers-leerling"></span>
													<b class="ng-binding">Magister+</b>
												</h3>
												<div class="content">
													<h4>Gemaakt door <b><a href="https://dantenl.tk" target="_blank" rel="noopener noreferrer">dante_nl</a></b></h4>
													<h4>Logo gemaakt door <b>SnotjeXIV</b></h4>
													<p>Magister+ is gemaakt omdat Magister op zich wel oké is, maar er waren zeker wat verbeterpuntjes. Zoals je totale gemiddelde in je cijferoverzicht en de kleuren.</p>
													<hr>
													<form id="mg+_notes_form">
														<textarea id="mg+_notes" rows="10" cols="50"></textarea>
														<br>
														<button type="submit" style="
															border: none;
															border-radius: 8px;
															padding: 10px 12px;
															background: #00d4ff35;
														">Opslaan</button>
													</form>
													<hr>
													<p style="font-size: 1.2rem">Wat is nieuw?</p>
													<p id="mg+_version_string">Versie <b><code>1.2.0</code></b></p>
													<br>
													<p>• Je kan nu een les als belangrijk markeren door op <span style="color: #ef476f">&#9888;</span> te klikken.</p>
													<p>• Notes op je homescherm</p>
												</div>
												<footer class="endlink">
													<a href="https://github.com/dante-nl/MagisterPlus" title="">github</a>
												</footer>
												</div>
											</div>
										</div>
										<div id="drop-2-1" class="droppable ng-isolate-scope ng-hide" data-sm-drag-drop="{drop: true}" data-drag-enabled="editMode" data-drop="handleDrop" data-ng-show="editMode" data-role="droptarget">
										</div>
									</div><!-- end ngRepeat: widget in columnedWidgets[column.order] | orderBy:'Positie.Volgnummer' -->
									<div class="widget spacer ng-hide" data-ng-hide="columnedWidgets[column.order]">&nbsp;</div>
									<!-- </div> -->
						
					`
					// document.getElementsByClassName("content-container")[0].innerHTML += html
					document.getElementById("vandaagschermtop").insertAdjacentHTML("afterend", html)

					// Notities
					const form = document.getElementById("mg+_notes_form");
					const textarea = document.getElementById("mg+_notes");

					form.addEventListener("submit", (e) => {
						e.preventDefault();
						localStorage.setItem("mg+_notes", textarea.value);
					});

					const savedValue = localStorage.getItem("mg+_notes");
					if (savedValue) {
						textarea.value = savedValue;
					}
				}
			}
		}
	})
}

function generateIDs() {
	var intervalId = setInterval(function(){
		if(document.querySelector(".nrblock")){
			clearInterval(intervalId);
			// Alleen uitvoeren wanneer lessen zijn ingeladen
			var elements = document.querySelectorAll("[ng-class*='important-row']");
			// Lessen loop
			for (var i = 0; i < elements.length; i++) {
				if(!elements[i].id) {
					// Als het geen ID heeft (nog niet eerder bekeken), geef het een ID
					elements[i].id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
					elements[i].querySelectorAll(".ng-binding")[0].innerHTML += `<span style="color: #ef476f">&#9888;</span>`;
					// Het uitroeptekentje toevoegen zodat het als belangrijk gemarkeerd kan worden met een eventListener
					elements[i].querySelectorAll(".ng-binding")[0].addEventListener("click", function() {
						console.log(this.parentElement.parentElement.parentElement.style.backgroundColor)
						if(this.parentElement.parentElement.parentElement.style.backgroundColor == "rgba(239, 71, 111, 0.208)") {
							// Kijken of de les al gemarkeerd is, als dat het geval is, er voor zorgen dat de les ongemarkeerd kan worden
							console.log("HI!")
							for (var i4 = 0; i4 < localStorage.length; i4++){
								if(localStorage.key(i4).includes("mg+")) {
									console.log(localStorage.key(i4).includes("mg+"))
									console.log(localStorage.key(i4))
									dict = JSON.parse(localStorage.getItem(localStorage.key(i4).replace("⚠", "")))
									for (var i5 = 0; i5 < elements.length; i5++) {
										console.log(this)
										if(this.parentElement.parentElement.parentElement.querySelectorAll(".ng-binding")[2].innerText.indexOf(" ") > 0) {
											var spacePos = this.parentElement.parentElement.parentElement.querySelectorAll(".ng-binding")[2].innerText.indexOf(" ")
										} else {
											var spacePos = 100
										}

										if(this.parentElement.parentElement.parentElement.querySelectorAll(".ng-binding")[0].innerText.replace("⚠", "") == dict["time"].replace("⚠", "") 
										&& this.parentElement.parentElement.parentElement.querySelectorAll(".ng-binding")[2].innerText.substring(0, spacePos) == dict["subj"].replace("⚠", "")) {
											console.log("HI 2")
											console.log(this.parentElement.parentElement.parentElement)
											console.log(i4)
											localStorage.removeItem(localStorage.key(i4))
											// this.parentElement.parentElement.parentElement.style.backgroundColor = "#06d6a035"
											this.parentElement.parentElement.parentElement.style.backgroundColor = "initial"
											return
										}
									}
								}
							}
						} else {
							if(this.parentElement.parentElement.parentElement.querySelectorAll(".ng-binding")[2].innerText.indexOf(" ") > 0) {
								var spacePos = this.parentElement.parentElement.parentElement.querySelectorAll(".ng-binding")[2].innerText.indexOf(" ")
							} else {
								var spacePos = 100
							}
							// Krijg het type les en tijd
							time_subject = {
								"time": this.parentElement.parentElement.parentElement.querySelectorAll(".ng-binding")[0].innerText,
								"subj": this.parentElement.parentElement.parentElement.querySelectorAll(".ng-binding")[2].innerText.substring(0, spacePos)
							}

							localStorage.setItem(`mg+_${this.parentElement.parentElement.parentElement.id}`, JSON.stringify(time_subject));
							this.parentElement.parentElement.parentElement.style.backgroundColor = "#ef476f35"
							// Opslaan in localStorage en verander achtergrond kleur
						}
					});
				}
			
				for (var i2 = 0; i2 < localStorage.length; i2++){
					if(localStorage.key(i2).includes("mg+") && !localStorage.key(i2).includes("mg+_notes")) {
						dict = JSON.parse(localStorage.getItem(localStorage.key(i2).replace("⚠", "")))
						for (var i3 = 0; i3 < elements.length; i3++) {
							var child = elements[i3].querySelectorAll(".ng-binding");
							// console.log(child)
							if(child[2].innerText.indexOf(" ") > 0) {
								spacePos = child[2].innerText.indexOf(" ")
							} else {
								spacePos = 100
							}

							if(child[0].innerText.replace("⚠", "") == dict["time"].replace("⚠", "") && child[2].innerText.substring(0, spacePos).replace("⚠", "") == dict["subj"].replace("⚠", "")) {
								elements[i3].style.backgroundColor = "#ef476f35"
							}
						}
					}
				}
			}
		}
	})
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "form_submitted" ) {
      chrome.storage.local.set({notes: request.data}, function() {
        console.log("Data saved to local storage");
      });
    }
  }
);
// TODO: Release notes op homescherm
// TODO: Zorg ervoor dat je lessen als belangrijk kan markeren
// TODO: Zorg ervoor dat de extra tekst om vak als belangrijk te markeren zichtbaar is
