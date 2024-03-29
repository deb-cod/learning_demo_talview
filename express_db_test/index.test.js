import request from 'supertest';
import {app} from './index.js';



describe("API End Point Testing",()=>{
    it("GET /api/getuser/:id should get a user by ID, 404 FOR NOT USING 'overall_auth'", async()=>{ // 404 FOR NOT USING 'overall_auth'
        const userId = 1; // Example user ID
        const res = await request(app).get(`/api/getuser/${userId}`);
    
        // expect(res.statusCode).toEqual(200);
        expect(res.statusCode).toEqual(404);
      });


    describe("Overall Auth",()=>{
        it("Overall Auth On Use",async()=>{
            const res = await request(app).get('/api/getuser/1?passcode=password'); // we can use any method over here from our ./routes/router.mjs
            // console.log(res);
            expect(res.statusCode).toBe(400);

            // ONLY AFTER PASSING 'Overall Auth', It askes for s_number and s_name
            expect(res._body).toEqual({"message":"Caution: Query parameters s_number and s_name are required."});

        });
    });    

    describe("Overall Auth Given but NO USUAL or PRO Auth if provided",()=>{
        it("NO USUAL or PRO Auth if provided",async()=>{
            const res = await request(app).get('/api/getuser/1?passcode=password'); // we can use any method over here from our ./routes/router.mjs
            // console.log(res);
            expect(res.statusCode).toBe(400);
            // ONLY AFTER PASSING 'Overall Auth', It askes for s_number and s_name
            expect(res._body).toEqual({"message":"Caution: Query parameters s_number and s_name are required."});
    
        });
    });               


    describe("Overall Auth",()=>{
        it("Overall Auth On Use",async()=>{
            const res = await request(app).get('/api/getuser/1?passcode=password'); // we can use any method over here from our ./routes/router.mjs
            // console.log(res);
            expect(res.statusCode).toBe(400);

            // ONLY AFTER PASSING 'Overall Auth', It askes for s_number and s_name
            expect(res._body).toEqual({"message":"Caution: Query parameters s_number and s_name are required."});

        });    


        it("Overall Auth On Use With Wrong Password",async()=>{
            // const res = await request(app).get('/api/getuser/1?passcode=password1&s_name=Kim&s_number=459038');

            const res = await request(app).get('/api/getuser/1?passcode=password1'); // for wrong Overall Passcode, passcode=password
            // console.log(res);

            expect(res.statusCode).toBe(404);
            expect(res._body).toEqual({message:'No/Incorrect Password for Overall Auth Enter password as passcode'});

        });
    })

    describe("Process With individual with Usual Auth", ()=>{

        it("Getting All Users If Usual Auth NOT USED PROPERLY", async()=>{
            const res = await request(app).get('/api/alluser?passcode=password&s_name=Cristyi&s_number=337775');
            // console.log(res);

            expect(res.statusCode).toBe(404);
            expect(res._body).toEqual({"message":"You are not in ALL USER list, Query Required: s_number s_name"})
        });

        it("If 's_name' or 's_number is NOT PRESENT", async()=>{
            const res = await request(app).get('/api/alluser?passcode=password&s_number=337775');
            const res1 = await request(app).get('/api/alluser?passcode=password&s_name=Cristy');
            // console.log(res);

            expect(res.statusCode).toBe(400);
            expect(res._body).toEqual({"message": "Caution: Query parameters s_number and s_name are required."})
            expect(res1.statusCode).toBe(400);
            expect(res1._body).toEqual({"message": "Caution: Query parameters s_number and s_name are required."})
        });


        it("Getting User By ID", async()=>{

            const res = await request(app).get('/api/getuser/1?passcode=password&s_name=Cristy&s_number=337775');

            const id_1_data = {
                "id": 1,
                "first_name": "Coretta",
                "last_name": "Van Hesteren",
                "email": "cvanhesteren0@businessinsider.com",
                "working_sector": "Mining & Quarrying of Nonmetallic Minerals (No Fuels)",
                "car_make": "GMC",
                "car_model": "Sierra 3500",
                "car_model_year": 2007,
                "car_vin_number": "1G6KY54983U106221",
                "created_at": "2024-03-27T12:59:46.590Z",
                "updated_at": "2024-03-27T12:59:46.590Z"
            }

            const id_1_data_altered = {
                "id": 1,
                "first_name": "Coretta",
                "last_name": "Van Hesteren",
                "email": "cvanhesteren0@businessinsider.com",
                "working_sector": "Mining & Quarrying of Nonmetallic Minerals (No Fuels)",
                "car_make": "GMC",
                "car_model": "Sierra 3500",
                "car_model_year": 2007,
                "car_vin_number": "1G6KY54983U1062214", // altered here, last 4
                "created_at": "2024-03-27T12:59:46.590Z",
                "updated_at": "2024-03-27T12:59:46.590Z"
            }

            
            expect(res.statusCode).toBe(200);
            expect(res._body).toBeDefined();
            expect(res._body).toEqual(id_1_data);
            expect(res._body).not.toEqual(id_1_data_altered);

        });

        it("Getting User By Unknown ID", async()=>{
            const res = await request(app).get('/api/getuser/1000000000000000000?passcode=password&s_name=Cristy&s_number=337775');
            // console.log(res);

            expect(res.statusCode).toBe(404)
            expect(res._body).toEqual({message: 'ID Number Does Not Exist'});
        });

        it("Getting All Users", async()=>{
            const res = await request(app).get('/api/alluser?passcode=password&s_name=Cristy&s_number=337775');
            // console.log(res);

            expect(res.statusCode).toBe(200);
        });


    });



    describe("Partition of Users, If Individuals having Usual Auth trying to do Process that only have PRO USER Authority, No AUTHORITY for Usual User", ()=>{

        it("To Create User By Individuals having Usual Auth", async()=>{
            const res = await request(app).get('/api/createuser?passcode=password&s_name=Cristy&s_number=337775');
            // console.log(res);
            expect(res.statusCode).toBe(404);
        });

        it("To Delete User By Individuals having Usual Auth", async()=>{
            const res = await request(app).get('/api/deleteuser/500?passcode=password&s_name=Cristy&s_number=337775');
            // console.log(res);
            expect(res.statusCode).toBe(404);
        });

        it("To Create User By Individuals having Usual Auth", async()=>{
            const res = await request(app).get('/api/updateuserdata/400?passcode=password&s_name=Cristy&s_number=337775');
            // console.log(res);
            expect(res.statusCode).toBe(404);
        });

    });



    describe("Process With individual with Pro Auth", ()=>{

        it("Getting All Users If Pro Auth NOT USED PROPERLY", async()=>{
            const res = await request(app).get('/api/alluser?passcode=password&s_name=Kim1&s_number=459038');
            // console.log(res);

            expect(res.statusCode).toBe(404);
            expect(res._body).toEqual({"message":"You are not in ALL USER list, Query Required: s_number s_name"})
        });


        it("Getting All Users If Usual Auth NOT USED PROPERLY", async()=>{
           
            const updated_data = {
                "column_name":"first_name",
                "changed_value":"New_Name"
            }

            const res = await request(app).put('/api/updateuserdata/57?passcode=password&s_number=459038&s_name=Kim1')
            .send(updated_data);

            expect(res.statusCode).toBe(404);
            expect(res._body).toEqual({"message":"You are not in PRO USER list, Query Required: s_number s_name"})
        });



        it("If 's_name' or 's_number is NOT PRESENT", async()=>{

            const updated_data = {
                "column_name":"first_name",
                "changed_value":"New_Name"
            }

            const res = await request(app).put('/api/updateuserdata/57?passcode=password&s_number=459038').send(updated_data);
            const res1 = await request(app).put('/api/updateuserdata/57?passcode=password&s_name=Kim').send(updated_data);
            // console.log(res);

            expect(res.statusCode).toBe(401);
            expect(res._body).toEqual({"message": "Caution: Query parameters s_number and s_name are required."})
            expect(res1.statusCode).toBe(401);
            expect(res1._body).toEqual({"message": "Caution: Query parameters s_number and s_name are required."})
        });


        it("Getting User By ID", async()=>{

            const res = await request(app).get('/api/getuser/1?passcode=password&s_name=Kim&s_number=459038');

            // console.log(res._body["id"]);

            const id_1_data = {
                "id": 1,
                "first_name": "Coretta",
                "last_name": "Van Hesteren",
                "email": "cvanhesteren0@businessinsider.com",
                "working_sector": "Mining & Quarrying of Nonmetallic Minerals (No Fuels)",
                "car_make": "GMC",
                "car_model": "Sierra 3500",
                "car_model_year": 2007,
                "car_vin_number": "1G6KY54983U106221",
                "created_at": "2024-03-27T12:59:46.590Z",
                "updated_at": "2024-03-27T12:59:46.590Z"
            }

            const id_1_data_altered = {
                "id": 1,
                "first_name": "Coretta",
                "last_name": "Van Hesteren",
                "email": "cvanhesteren0@businessinsider.com",
                "working_sector": "Mining & Quarrying of Nonmetallic Minerals (No Fuels)",
                "car_make": "GMC",
                "car_model": "Sierra 3500",
                "car_model_year": 2007,
                "car_vin_number": "1G6KY54983U1062214", // altered here, last 4
                "created_at": "2024-03-27T12:59:46.590Z",
                "updated_at": "2024-03-27T12:59:46.590Z"
            }

            
            expect(res.statusCode).toBe(200);
            expect(res._body).toBeDefined();
            expect(res._body).toEqual(id_1_data);
            expect(res._body).not.toEqual(id_1_data_altered);

        });

        it("Getting User By Unknown ID", async()=>{
            const res = await request(app).get('/api/getuser/1000000000000000000?passcode=password&s_name=Kim&s_number=459038');
            // console.log(res);

            expect(res.statusCode).toBe(404)
            expect(res._body).toEqual({message: 'ID Number Does Not Exist'});
        });

        it("Getting All Users", async()=>{
            const res = await request(app).get('/api/alluser?passcode=password&s_name=Kim&s_number=459038');
            // console.log(res);

            expect(res.statusCode).toBe(200);
        });


        describe("Create User", ()=>{


            console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
            console.log("                   CHANGE THE EMAIL ID AS IT IS SET UNIQUE CONSTRAINT IF YOU ARE RUNNING THE TEST AGAIN")
            console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
            
            // it('POST /api/createuser should create a new user', async () => {

            //     const new_user_data = {
            //         first_name: 'From 6',
            //         last_name: 'Test 6',
            //         email: 'from6.test1@example.com',
            //         working_sector: 'IT',
            //         car_make: 'Toyota',
            //         car_model: 'Camry',
            //         car_model_year: 2020,
            //         car_vin_number: '123456789'
            //       }

            //     const res = await request(app)
            //       .post('/api/createuser?passcode=password&s_name=Kim&s_number=459038')
            //       .send(new_user_data);
            
            //     expect(res.statusCode).toBe(200);
            //   });



            it('POST /api/createuser Repeat User from Email', async () => {

                const new_user_data = {
                    first_name: 'From',
                    last_name: 'Test',
                    email: 'from.test@example.com',
                    working_sector: 'IT',
                    car_make: 'Toyota',
                    car_model: 'Camry',
                    car_model_year: 2020,
                    car_vin_number: '123456789'
                    }

                const res = await request(app)
                    .post('/api/createuser?passcode=password&s_name=Kim&s_number=459038')
                    .send(new_user_data);

                // console.log(res);
                expect(res.statusCode).toBe(400);
                
                });

            it("Delete User", async()=>{

                ///////////////////////////////////////////////////////////////////
                //      CREATING A DUMMY USER AND DELETING THE DUMMY USER
                ///////////////////////////////////////////////////////////////////

                const new_user_data_del = {
                    first_name: 'Fromdel',
                    last_name: 'Testdel',
                    email: 'fromdel.testdel@example.com',
                    working_sector: 'IT',
                    car_make: 'Toyota',
                    car_model: 'Camry',
                    car_model_year: 2020,
                    car_vin_number: '123456789'
                    }

                const res = await request(app)
                    .post('/api/createuser?passcode=password&s_name=Kim&s_number=459038')
                    .send(new_user_data_del);
            
                expect(res.statusCode).toBe(200);

                const res_del = await request(app)
                    .delete(`/api/deleteuser/${res._body["id"]}?passcode=password&s_name=Kim&s_number=459038`)
                
                
                expect(res_del.statusCode).toBe(200);
                expect(res._body).toEqual(res_del._body);
            });

            it("Deleting Unknown User", async()=>{

                const res = await request(app)
                    .delete(`/api/deleteuser/1000000000000?passcode=password&s_name=Kim&s_number=459038`)
                
                
                expect(res.statusCode).toBe(400);
                expect(res._body).toEqual({"message":"User with That ID not found"});
            });


              
        });
        
        
    
        describe("Update User data", ()=>{
            it("Updating user", async()=>{

                const updated_data = {
                    "column_name":"first_name",
                    "changed_value":"New_Name"
                }
                const res = await request(app)
                    .put(`/api/updateuserdata/789?passcode=password&s_name=Kim&s_number=459038`)
                    .send(updated_data)

                expect(res.statusCode).toBe(200);
                expect(res._body[updated_data["column_name"]]).toBe(updated_data["changed_value"]);
            });
            
            it("Updating Unknown User", async()=>{

                const res = await request(app)
                    .put(`/api/updateuserdata/1000000000000?passcode=password&s_name=Kim&s_number=459038`)
                
                
                expect(res.statusCode).toBe(400);
                expect(res._body).toEqual({"message":"User with That ID not found"});
            });

        });


    });



    describe("Pagination Endpoint Testing", () => {
        it("GET /api/page should return paginated data", async () => {
            const page = 1;
            const pageSize = 10;
    
            const res = await request(app)
                .get(`/api/page?offset_val=${page}&pageSize=${pageSize}&passcode=password&s_name=Kim&s_number=459038`)
                .set('Accept', 'application/json');
    
            expect(res.statusCode).toBe(200);
            expect(res._body.length).toBe(pageSize);

            const page_1 = 1;
            const pageSize_exced = 100;

            const res_1 = await request(app)
                .get(`/api/page?offset_val=${page_1}&pageSize=${pageSize_exced}&passcode=password&s_name=Kim&s_number=459038`)
                .set('Accept', 'application/json');
    
            expect(res_1.statusCode).toBe(200);
            expect(res_1._body.length).toBe(50);

            
    
        });
    });


});