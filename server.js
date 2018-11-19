/*	Richard St. John
	Roman Ranallo


*/

const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const expRequest = require("request")

const app = express()


const PORT = process.env.PORT || 3000
const ROOT_DIR = "/public"
const path = require("path")
const API_KEY = "3838769ed4fcbfcf91eb9306280948db"
const HOST = "https://www.food2fork.com/api/search"

function sendResponse(body, response) {
	body = JSON.parse(body)
	
	let page = `<html lang = "en-US"><head><meta charset = "UTF-8">
		<link rel="stylesheet" type="text/css" href="/public/styles/style.css">
		<title>Recipes</title> 
		</head><body>
		<form id="queryForm" method="post">
		Ingredients: <input name="ingredients">
		<input type="submit" value="Get Recipes">
		</form><div id="photoArea">`
	if (body !== null){
		for(let i=0; i<body.count; i++) {
			page += `<div class="photo">
					<a href="${body.recipes[i].f2f_url}" target="_blank">
					<img class="photo" src="${body.recipes[i].image_url}"></a>
					<p class="photo">${body.recipes[i].title}</div>`
		}
	}
	page +=	`<p></p></div></body></html>`
	
	response.send(page)
}

function sendGetRequest(ingredients, res) {
	let url = HOST + `?q=${ingredients}&key=${API_KEY}`
	expRequest.get(url, function(error, response, body) {
		if(error) {
			console.log(`Error:${error}`)
			sendResponse(null, res)
		}
		console.log(body)
		sendResponse(body, res)
	})
}

function postResponse(request, response) {
	let ingredients = request.body.ingredients
	console.log(ingredients)
	sendGetRequest(ingredients, response)
}

function getResponse(request, response) {
	//Add code to get Json and then inject html div elements with class="photos" into id="photoArea
	let ingredients = request.query.ingredients
	console.log(ingredients)
	if(ingredients) {
		sendGetRequest(ingredients, response)
	}
	else {
		sendResponse(null, response)
	}
	//response.sendFile(path.join(__dirname + ROOT_DIR +"/index.html"))
}

app.use(logger("dev"))
app.use(bodyParser.urlencoded({}))
app.use(bodyParser.json())

app.get("/recipes.html", getResponse)
app.get("/recipes", getResponse)
app.get("/index.html", getResponse)
app.get("/", getResponse)
app.get("", getResponse)
app.get("/public/styles/style.css", function(req, res) {
	res.sendFile(__dirname + ROOT_DIR + "/styles/style.css")
	})
app.post("/recipes", postResponse)
app.post("/recipes.html", postResponse)
app.post("/recipes", postResponse)
app.post("/index.html", postResponse)
app.post("/", postResponse)
app.post("", postResponse)

app.listen(PORT, err => {
  if (err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT} CNTL-C to Quit`)
    console.log('To Test')
    console.log('http://localhost:3000/recipes.html')
    console.log('http://localhost:3000/recipes')
    console.log('http://localhost:3000/index.html')
    console.log('http://localhost:3000/')
    console.log('http://localhost:3000')
  }
})

