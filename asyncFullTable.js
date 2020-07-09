const {Client} = require('pg')
const express = require ("express")
const app = express();
app.use(express.json())

// function clickButton(){
//   var genre = document.get.getElementById("genre").value
//   return genre
// }


const client = new Client ({
    user:"postgres",
    password:"131219",
    host:"TFGcos-MacBook-Pro.local",
    port: 5432,
    database: "postgres"

})

app.get("/", (req,res) => res.sendFile(`${__dirname}/index.html`))
app.get("/movie", async (req,res) => {
  const result = await showMovie()
  res.setHeader("content-type", "application/json")
  res.send(JSON.stringify(result))
//  res.send("ola")
})
app.listen(8080, () => console.log("web service on port 8080"))
start()
async function start(){
  await connect()
}
async function connect(){
  try{
    await client.connect()

  }
  catch(e){
    console.error('failed to connect')
  }
}
async function execute(){
    try{
        console.log("Sucess")
        //const results = await client.query("select * from movies4 where genre = $1",["Drama"])
        const results = await client.query("select * from movies4 where year BETWEEN $1 AND $2", [1999, 2010])
        //console.table(results.rows)
        let final =  results.rows
        var newArray =  final.filter(function (el) {
          return el.genre == "Drama" &&
                 el.avg_vote >= 7 &&
                 el.votes > 200 &&
                 el.votes < 1000;
});

    }
    catch (ex)
    {
        console.log("Something wrong happend")
    }
    finally
    {
        await client.end()
        console.log("client disconected")
      //  console.log(finalResult.title)
        console.log(newArray)

        return newArray
    }

}

async function showMovie(){
  let i =  Math.floor(Math.random() * 11);
  var newArray = await execute()
  var finalResult =  newArray[i]
  console.log(finalResult)
  return finalResult
}
