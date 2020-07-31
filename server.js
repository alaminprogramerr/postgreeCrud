// import all required library
const express =require('express')
const PORT =process.env.PORT||5000
const app=express()
const {Connection,Client} =require('pg')
const bodyParser =require('body-parser')
const cors=require('cors')

// DB connection string
var connectionString = "postgres://postgres:1234@localhost:5432/db";
// postgres://postgres:1234@localhost:5432/db";
// 1234 is password ,db is database name 



// using  middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())







const client = new Client({
    connectionString: connectionString
});

client.connect()
.then(()=>{
    console.log('Database connected')
})
.catch(err=>{
    console.log('Server error occurd DB connecting time ',err)
})






app.post('/post',(req,res)=>{
    console.log(req.body)
    
    var input=req.body.input.split(',')
    var filteredNumber = input.filter(function (item) {
        return (parseInt(item) == item);
    });    
    var filteredString = input.filter(function (item) {
        return !(parseInt(item) == item);
    });   
    var filteredString2 = input.filter(function (item) {
        return !(parseInt(item) == item);
    });


    // convert the number from string to number
    let convertadNumberArray=[]
    let convertadNumberArray2=[]
    filteredNumber.forEach(element => {
        convertadNumberArray.push(parseInt(element))
        convertadNumberArray2.push(parseInt(element))
    });
    // sorting number 
    let asNumbers=convertadNumberArray.sort(function(a, b) {
        return a - b;
    });
    let dsNumbers=convertadNumberArray2.sort(function(a,b) {
        return b-a;
    });
    // sorting string
    let dsString=filteredString.sort(function (a, b) {
        if (a > b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    });
    let asString=filteredString2.sort(function (a, b) {
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1;
        }
        return 0;
    });


    if(req.body.sortMethod==='sana'){
        client.query('INSERT INTO data(output) VALUES($1)',[dsString+dsNumbers])
        .then(()=>{
            console.log('data saved')
        })
        .catch(err=>{
            console.log(err)
        })
        console.log(req.body.sortMethod)
        return res.json({output:asString+asNumbers})
    }
    if(req.body.sortMethod==='sdnd'){
        console.log(req.body.sortMethod)
        return res.json({output:dsString+dsNumbers})
    }
    if(req.body.sortMethod==='nasa'){
        console.log(req.body.sortMethod)
        return res.json({output:asNumbers+asString})
    }
    if(req.body.sortMethod==='ndsd'){
        console.log(req.body.sortMethod)
        return res.json({output:dsNumbers+dsString})
    }
    return res.json({output:'none'})
    

})




app.listen(PORT,()=>{
    console.log('Server started')
})