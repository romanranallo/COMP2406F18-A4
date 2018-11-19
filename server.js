/*	Richard St. John
	Roman Ranallo


*/

const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000
const ROOT_DIR = "/public"
const path = require("path")

function serveResponse(request, response) {
	
	//Add code to get Json and then inject html div elements with class="photos" into id="photoArea
	
	response.sendFile(path.join(__dirname + ROOT_DIR +"/index.html"))
}

app.get("/recipes.html", serveResponse)
app.get("/recipes")
app.get("/index.html", serveResponse)
app.get("/", serveResponse)
app.get("", serveResponse)


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

