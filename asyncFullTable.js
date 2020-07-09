const {Client} = require('pg')
const webpack = require('webpack');


const client = new Client ({
    user:"postgres",
    password:"131219",
    host:"TFGcos-MacBook-Pro.local",
    port: 5432,
    database: "postgres"

})



async function execute(){
    try{
        await client.connect()
        console.log("Sucess")
        //const results = await client.query("select * from movies4 where genre = $1",["Drama"])
        const results = await client.query("select * from movies4 where year BETWEEN $1 AND $2", [1999, 2010])
        //console.table(results.rows)
        let final = await results.rows
        var newArray = await final.filter(function (el) {
          return el.genre == "Drama" &&
                 el.avg_vote >= 7 &&
                 el.votes > 200 &&
                 el.votes < 1000;
});
        let i = await Math.floor(Math.random() * 11);
        let finalResult = await newArray[i]
        console.log(finalResult.title)
        return finalResult.title
    }
    catch (ex)
    {
        console.log("Something wrong happend")
    }
    finally
    {
        await client.end()
        console.log("client disconected")
    }

}

async function clickButton(){
    try{
       const final = await execute()
       console.log(final)
       return document.getElementById("result").innerHTML = final
    }catch (err) {return 'error'}
}

clickButton()
