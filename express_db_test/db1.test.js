// describe("1",()=>{
//     it("1",()=>{
//         expect(1).toBe(1)
//     })
// })

// import { PersonController } from "./controller/user.mjs";
// const userController = new PersonController();

// describe("Controller Level",()=>{
//     it("Create Person",()=>{
//         const result = userController.
//         expect(1).toBe(1)
//     })
// })

jest.setTimeout(10000);


import { PersonDAO } from './dao/dao.mjs';
import { db } from './db/db.mjs';


jest.mock('./db/db.mjs');

let personDAO;


describe('PersonDAO', () => {
  beforeEach(() => {
    personDAO = new PersonDAO();
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Insert a new user into the database", async () => {
    db.mockReturnValueOnce({ insert: jest.fn().mockReturnValueOnce({ returning: jest.fn().mockResolvedValueOnce([{ id: 99 }]) }) });

    const userData = {
      first_name: 'Tester',
      last_name: 'Ltest',
      email: 'tester.ltest@example.com',
      working_sector: 'IT',
      car_make: 'Toyota',
      car_model: 'Camry',
      car_model_year: 2020,
      car_vin_number: '123456789'
    };

    const insertedUser = await personDAO.createPerson(userData);
    //console.log(insertedUser);
    expect(insertedUser).toEqual({id: 99 });
    expect(db).toHaveBeenCalledWith('user_data');
  });


  it("Get all users", async()=>{
    const mockUserData=[
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];

    db.mockImplementation(()=>({
      orderBy: jest.fn().mockResolvedValueOnce(mockUserData)
      //then: jest.fn().mockResolvedValueOnce(mockUserData)
    }));

    const result = await personDAO.get_all();    

    
    // expect(db().orderBy).toHaveBeenCalledWith("id");
    expect(db).toHaveBeenCalledWith('user_data');
    expect(result).toEqual(mockUserData);

  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//         PROBLEM WITH REMOVE USING MOCKS

  // it("Remove User", async()=>{
  //   const mockUserId = 2;
  //   const mockRemovedUserData = { id: mockUserId, name: 'User 1' };

  //   db.mockReturnValueOnce({
  //     orderBy: jest.fn().mockReturnThis(),
  //     where: jest.fn().mockReturnThis(),
  //     del: jest.fn().mockReturnThis(),
  //     returning: jest.fn().mockReturnThis(),
  //     then: jest.fn().mockResolvedValueOnce([mockRemovedUserData])
  //   });

  //   const result = await personDAO.remove(mockUserId);

  //   expect(db).toHaveBeenCalledWith('user_data');
  //   expect(db().orderBy).toHaveBeenCalledWith("id");
  //   expect(db().where).toHaveBeenCalledWith({"id":mockUserId});
  //   expect(db().returning).toHaveBeenCalledWith('*');
  //   expect(db().del).toHaveBeenCalled();
    

  //   expect(result).toEqual(mockRemovedUserData);

  // });

////////////////////////////////////////////////////////////////////////////////////////////////////////
  


});

