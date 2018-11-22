function handleKeyUp(e) {

  if (e.which == 13) {
    handleSubmit() //treat ENTER key like you would a submit
    $('#ingredientField').val('') //clear the user text field
  }

  e.stopPropagation()
  e.preventDefault()
}

function handleSubmit() {
	let userText = $('#ingredientField').val(); //get text from user text input field
    

	$('#ingredientField').val('') //clear the user text field

	//Prepare a POST message for the server and a call back function
	//to catch the server repsonse.
	//i.e. the file
	$.post("handle", {ingredients: userText}, function(data, status) {
	  document.getElementById("photoArea").innerHTML = ""
	  console.log("data: " + data)
	  console.log("typeof: " + typeof data)
	  let body = JSON.parse(data)
	  
	  let page = '';
		if (body !== null){
			for(let i=0; i<body.count; i++) {
				page += `<div class="photo">
						<a href="${body.recipes[i].f2f_url}" target="_blank">
						<img class="photo" src="${body.recipes[i].image_url}"></a>
						<p class="photo">${body.recipes[i].title}</div>`
			}
		}
		page +=	`<p></p></div></body></html>`
		document.getElementById("photoArea").innerHTML = page;
	})
}

$(document).ready(function() {

  let url = window.location.search.substring(1)
  console.log("url: ", url)
  $(document).keyup(handleKeyUp)
  if (url != '') {
	  $('#ingredientField').val(url.substring(url.indexOf('=') + 1))
  }
  handleSubmit()
})

