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
		chrome.scripting.executeScript({
			func: highlightGrades,
			target: {
				tabId: thisTab.id,
				allFrames: true
			},
			injectImmediately: false,
			// args: [changeInfo],
		})
		// applyBlock(thisTab)
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
		chrome.scripting.executeScript({
			func: highlightGrades,
			target: {
				tabId: thisTab.id,
				allFrames: true
			},
			injectImmediately: false,
			// args: [changeInfo],
		})
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
						var grades_negative = 0;
						var grades_positive = 0;
						var averages_negative = 0;
						var grades_average = []
						for (var i = 0; i < grades.length; i++) {
							if(document.getElementsByClassName("grade")[i].innerText.replace(",", ".") <= 5.4 && !isNaN(parseInt(document.getElementsByClassName("grade")[i].innerText))) {
								document.getElementsByClassName("grade")[i].style.setProperty("background-color", "#ffc4c4", "important");
								grades_negative++;
								if(document.getElementsByClassName("grade")[i].classList.contains("gemiddeldecolumn")) {
									averages_negative++;
								}
							} else if(!isNaN(parseInt(document.getElementsByClassName("grade")[i].innerText))) {
								grades_positive++;
							}
						}
						var grade_average = 0
						grades_average.forEach(grade => {
							grade_average += grade
						});
						var grade_average = Math.floor(grade_average / grade_average.length)
						// console.info(`Cijfers gehighlight. ${grades_negative} onvoldoendes totaal, ${averages_negative} daarvan zijn in je gemiddelde en ongeveer ${Math.floor(averages_negative / 2)} cijfers waar je aandacht aan moet besteden. Je hebt ${grades_positive} voldoendes en je totale gemiddelde is een ${grade_average}`)
						// TODO: Fix the average grade
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
							if(!isNaN(parseInt(document.getElementsByClassName("grade")[i].innerText))) {
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
								<span id="NE_900_900" title="${Math.round(average)}" class="grade gemiddeldecolumn">${Math.round(average)}</span>
							</td>
							<td role="gridcell">
								<span id="NE_901_901" title="${average}" class="grade gemiddeldecolumn">${average}</span>
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
