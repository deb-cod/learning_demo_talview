import {PersonDAO} from './dao/dao.mjs';
import {db} from './db/db.mjs';

const dao = new PersonDAO;

afterAll(()=>{
    db.destroy();
});


describe("To get the element by ID",()=>{
    it("Get Element by ID", async()=>{
    
        const result = await dao.get_by(100);
    
        const data = {
            "id": 100,
            "first_name": "Lanny",
            "last_name": "Grossman",
            "email": "lgrossman2r@si.edu",
            "working_sector": "Computer Software: Prepackaged Software",
            "car_make": "Jaguar",
            "car_model": "X-Type",
            "car_model_year": 2004,
            "car_vin_number": "5TDDK3DC8ES085305",
            "created_at": new Date("2024-03-27T12:59:46.590Z"),
            "updated_at": new Date("2024-03-27T12:59:46.590Z")
        }
    
        expect(result).toEqual(data);
    
    });


    it("To get the element Which does not exist", async()=>{
        const result = await dao.get_by(1000000)
        expect(result).toBeUndefined();
    });


    describe("Usual Auth",()=>{
        it("Usual Auth for exixting user", async()=>{

            //"Cristy"	337775    EXISTS ONLY IN USUAL USER // if this user goes for PRO USER, it will throw undefined
            const s_name = "Cristy";
            const s_number = 337775;
            const result = await dao.usualAuth1(s_number, s_name);
            expect(result[0]).toBeDefined();
        });

        it("Usual Auth for NON-Exixting user", async()=>{

            //"Cristy"	337775    EXISTS ONLY IN USUAL USER // if this user goes for PRO USER, it will throw undefined
            const s_name = "Test";
            const s_number = 111111;
            const result = await dao.usualAuth1(s_number, s_name);
            expect(result[0]).toBeUndefined();
        });
    });



    describe("Pro Auth",()=>{
        it("Pro Auth for exixting user", async()=>{

            // "Kim"	459038
            const s_name = "Kim";
            const s_number = 459038;
            const result = await dao.proAuth1(s_number, s_name);
            expect(result[0]).toBeDefined();
        });

        it("Pro Auth for NON-Exixting user", async()=>{

            //"Cristy"	337775    EXISTS ONLY IN USUAL USER // if this user goes for PRO USER, it will throw undefined
            const s_name = "Cristy";
            const s_number = 337775;
            const result = await dao.proAuth1(s_number, s_name);
            expect(result[0]).toBeUndefined();
        });
    });


    describe("Pagination",()=>{
        it("Pagination", async()=>{
            const pageSize = 50;
            const page = 1;
            const offset_val = (page-1) * pageSize;
            const result = await dao.pagination(offset_val, pageSize);

            const result1 = await dao.pagination(2, pageSize);
            const result2 = await dao.pagination(3, pageSize);
            const result3 = await dao.pagination(3, 20);

            expect(result.length).toBe(50);
            expect(result1.length).toBe(50);
            expect(result2.length).toBe(50);
            expect(result3.length).toBe(20);
        });

    });


    describe("Remove",()=>{
        it("Remove for unknown ID", async()=>{

            const id = 10000000; // which does not exist
            const result = await dao.remove(id);

            expect(result).toBeUndefined();
        });



        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //        UNCOMMENT THE BELOW CODE AND CHANGE THE ID NUMBER TO GET THE TEST REGARDING THIS TEST
        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        // it("Remove for known ID", async()=>{

        //     const id = 1012;  // Change the id number 

        //     const result = await dao.remove(id);
        //     const getdata = await dao.get_by(id);

        //     expect(result).toBeDefined();
        //     expect(getdata).toBeUndefined();
        // });


        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //        UNCOMMENT THE ABOVE CODE AND CHANGE THE ID NUMBER TO GET THE TEST REGARDING THIS TEST   
        ///////////////////////////////////////////////////////////////////////////////////////////////////////


    });


    describe("Update",()=>{
        it("Update the Particular column with the Given Data", async()=>{

            const id = 986;
            const column_name = "first_name";
            const changed_value = "New";
            const result = await dao.updateData(id, column_name, changed_value);

            // console.log(result);
            // console.log(new Date());

            const time_diff = new Date()- new Date(result["updated_at"]);

            expect(changed_value).toEqual(result[column_name]);
            expect(time_diff).toBeLessThan(10);     // TIME DIFFERENCE MUST BE LESS THAN 10 sec
        });
    });



    
    
    
});