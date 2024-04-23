import express from 'express';
import {Sequelize} from 'sequelize';
const app = express();

app.use(express.json());


const POSTGRES_CONNECTION_URL = "postgres://postgres:postgrespassword@localhost:5432/postgres";
// console.log(POSTGRES_CONNECTION_URL);
const sequelize = new Sequelize(POSTGRES_CONNECTION_URL);



app.post('/createanotheruser', async(req,res)=>{
    console.log(req.body);
    console.log("**************************************************");
    // res.status(200).json({
    //     email:"dummy-mail-1",
    //     password:"dummy-password",
    //     displayName:"dummy-display"
    // });
    

//     const sequelize = new Sequelize('postgres', 'postgres', 'password', {
//     host: 'localhost',
//     dialect: 'postgres'
//   });
//     // console.log("******************************************************************\n",sequelize);
//     // console.log("******************************************************************\n");
    const sequelize = new Sequelize(POSTGRES_CONNECTION_URL,{});
    const username = req.body.input.credentials.username;
    const password = req.body.input.credentials.password;
    const displayName = req.body.input.credentials.displayName;
    const [result, metadata] = await sequelize.query("INSERT INTO test(username, password, display_name) values (:username, :password, :display_name);",{
        replacements:{
            username,
            password,
            display_name: displayName
        
        }
//     })
    // console.log(sequelize);

    // res.status(200).json({
    //     username:req.body.input.credentials.username,
    //     // displayName:"dymmy-11"
    //     displayName: req.body.input.credentials.displayName
    // });

});
if(metadata){
    res.status(200);
    await sequelize.close();
}
});




// app.post('/insert_event', async(req,res)=>{
//     // console.log(req.body);
//     const sequelize = new Sequelize(POSTGRES_CONNECTION_URL);
// //     const a = await sequelize.query("INSERT INTO test(username, password, display_name) VALUES (:userName, :passWord, :displayName);",
// // {
// //     replacements:{
// //         userName: "test1234",
// //         passWord: "pass1234",
// //         displayName: "dtest1234"
// //     }
// // });
// // res.status(200).json({message:"done"});
// //     return a
// // });



// try {
//     const [result, metadata] = await sequelize.query(`
//         INSERT INTO test(username, password, display_name) 
//         VALUES (:userName, :passWord, :displayName);`,
//         {
//             replacements: {
//                 userName: "test123456",
//                 passWord: "pass123456",
//                 displayName: "dtest123456"
//             }
//         });

//     console.log(result);

//     if (result.length < 0 && metadata>1) {
//         res.status(200).json({ message: "done", result });
//     } else {
//         res.status(500).json({ message: "error", error: "Failed to insert data" });
//     }

// } catch (error) {
//     console.error('Error inserting data:', error);
//     res.status(500).json({ message: "error", error: error.message });
// }
// });





app.post('/insert_event', async (req, res, next) => {
    console.log(req.body);

    console.log("/////////////////////////////////////////////////////");


    

    try {
        const [result, metadata] = await sequelize.query(`
            INSERT INTO test(username, password, display_name) 
            VALUES (:userName, :passWord, :displayName);`,
            {
                replacements: {
                    userName: "test1234567",
                    passWord: "pass1234567",
                    displayName: "dtest1234567"
                }
            });

        console.log(result,metadata);
        if(metadata){
        res.status(200).json({ message: "done", result });
        
    }


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "error", error: error.message });
    }
});

    



const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Running at ${PORT}`)
})