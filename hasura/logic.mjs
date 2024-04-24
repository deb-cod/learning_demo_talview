import {Sequelize} from 'sequelize';

const POSTGRES_CONNECTION_URL = "postgres://postgres:postgrespassword@localhost:5432/postgres";


export class HasuraLogic{


    async insert_event(req, res, next){
        // console.log(req.body);
        console.log("/////////////////////////////////////////////////////");
        const sequelize = new Sequelize(POSTGRES_CONNECTION_URL);
        try {
            await sequelize.query(`
            INSERT INTO test(username, password, display_name) 
            VALUES (:userName, :passWord, :displayName);`,
                {
                    replacements: {
                        userName: "test1234567",
                        passWord: "pass1234567",
                        displayName: "dtest1234567"
                    }
                });

            // console.log(result,metadata);
            // if(metadata){
                res.status(200).json({
                    userName: "test1234567",
                    passWord: "pass1234567",
                    displayName: "dtest1234567"
                });

            // }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "error", error: error.message });
        }
    };




    async create_another_user(req,res){
    console.log(req.body);
    console.log("**************************************************");
    try{
    const sequelize = new Sequelize(POSTGRES_CONNECTION_URL,{});
    const username = req.body.input.credentials.username;
    const password = req.body.input.credentials.password;
    const displayName = req.body.input.credentials.displayName;
    await sequelize.query("INSERT INTO test(username, password, display_name) values (:username, :password, :display_name);",{
        replacements:{
            username,
            password,
            display_name: displayName
        
        }
    }); 
    res.status(200).json({username, displayName});
    sequelize.close();
    }
    catch(error){
        console.log(error);
        throw error;
    }

};









}
