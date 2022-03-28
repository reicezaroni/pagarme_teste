//para rodar o db  node src/database/db.js
//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// //criar o objeto que irá fazer operações no banco de dados
const db =  new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de banco de dados, para nossas operações
//db.serialize(() => {
// //     //com comandos sql:
// //     //1: criar uma tabela
    // db.run(`
    //      CREATE TABLE IF NOT EXISTS transactions (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         trans_value TEXT,
    //         trans_description TEXT,
    //         pay_method TEXT,
    //         card_n TEXT,
    //         name TEXT,
    //         exp_date TEXT,
    //         cvv TEXT
    //     );
    //     CREATE TABLE IF NOT EXISTS payables (
    //       id INTEGER PRIMARY KEY AUTOINCREMENT,
    //       trans_value TEXT,
    //       rec_value TEXT,
    //       status TEXT,
    //       payment_date TEXT,
    //       name TEXT
    //   );

    // `)
// //     //2: inserir dados na tabela
    
//     const query =`
//             INSERT INTO transactions(
//               trans_value,
//               trans_description,
//               pay_method,
//               card_n,
//               name,
//               exp_date,
//               cvv
//             ) VALUES (?,?,?,?,?,?,?);            
//     `
    
//     const values = [
        
//                 "37,25",
//                 "Nike SB",
//                 "Crédito",
//                 "7864",
//                 "Ananias",
//                 "11/28",
//                 "450"   
//     ]

//     const values2 = [
        
                
// ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }
    
// //     //comentado para ele nao colocar mais nada no bd
// db.run(query, values, afterInsertData)

//     //3: consultar dados na tabela
    // db.all(`SELECT * FROM transactions`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }
        
    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })

        
// //     //4: deletar dados na tabela
// //     /*db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
// //         if(err){
// //             return console.log(err)
// //         }
        
// //         console.log("Registro deletado com sucesso!")
// //     })*/
    
 //})