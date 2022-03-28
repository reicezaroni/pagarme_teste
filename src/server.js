//para rodar o server, dentro do bash npm start, abrir no navegador o localhost:3000 
//npm instalados:
//npm install express
//npm install nodemon
//npm install nunjucks

const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js") // ta recebendo o db do banco nessa const db

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //tirar o cache enquanto desenvolve
})

//configurar caminhos da minha aplicação
//páginal inicial
//req: requisição (pergunta)
//res: resposta
server.get("/", (req,res) =>{
    //res.send("cheguei aqui")
    //res.sendFile(__dirname + "/views/index.html")
    return res.render("index.html")

})

server.get("/create-point", (req,res) =>{
    //req.query: Query strings da nossa url
    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) =>{
    //req.body: o corpo do nosso formulário
    console.log(req.body)
    //inserir dados no banco
    const query =`
            INSERT INTO transactions(
                trans_value,
                trans_description,
                pay_method,
                card_n,
                name,
                exp_date,
                cvv
            ) VALUES (?,?,?,?,?,?,?);
            
                
    `
    const query2 =`
    INSERT INTO payables(
        trans_value,
        rec_value,
        status,
        payment_date,
        name
    ) VALUES(?,?,?,?,?);
    `
    var states = {
        'Débito': 'paid',
        'Crédito': 'waiting_funds',
    };
    const values = [
        req.body.value,
        req.body.desc,
        req.body.method,
        req.body.card, 
        req.body.name, 
        req.body.date,
        req.body.cvv,
       
                
    ]
    var date2;
    if(states[req.body.method] !="paid"){
        date2= "D+0";
     }
    else{
        date2 = "D+30";
    }
    //payables
    const values2 = [
        req.body.value,
        (parseFloat(req.body.value) * 0.95).toFixed(2),  // -5%
        states[req.body.method], //status
       date2, // data do pagamento
        req.body.name,  //name   
                
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Pagamento efetuado com sucesso!")
        console.log(this)
        //mandando de volta pra pagina create point
        return res.render("create-point.html", {saved: true})
    }
    
    //comentado para ele nao colocar mais nada no bd
    db.run(query, values, afterInsertData)
    db.run(query2, values2)
    
})

server.get("/search-results", (req,res) =>{
    // consultar dados na tabela
    db.all(`SELECT * FROM payables`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        var paid = 0
        var waiting_funds = 0
        rows.forEach((row, index) => {
            if(row.status != "paid"){
                    
                waiting_funds = (parseFloat(waiting_funds)) +  (parseFloat(row.rec_value))
                console.log("waiting: ", waiting_funds)
                console.log("status: ", row.status)
            }
            else{
                paid = (parseFloat(paid)) + (parseFloat(row.rec_value))
                console.log("paid: ", paid)
                console.log("status: ", row.status)
            }
        });
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {valores: rows, total: total, waiting_funds: waiting_funds.toFixed(2), paid: paid.toFixed(2)})
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })
   
})

//ligar o servidor
server.listen(3000)