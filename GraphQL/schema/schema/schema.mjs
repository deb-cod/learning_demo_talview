import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
// import dummy_users from '../dummy_data/MOCK_DATA.json' with { type: "json" };
// console.log(dummy_users.length)
// const UserType = new GraphQLObjectType({
//     name : 'User',
//     fields: ()=>({
//         id: {type: GraphQLInt},
//         first_name: {type: GraphQLString},
//         last_name: {type: GraphQLString},
//         email: {type: GraphQLString},
//         password: {type: GraphQLString},
//         car_make: {type: GraphQLString},
//         car_model: {type: GraphQLString}
//     })
// });
//
// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         getAllUsers: {
//             type: new GraphQLList(UserType),
//             args: {id: {type: GraphQLInt}},
//             resolve(parent, args){
//                 return dummy_users;
//             }
//         }
//     }
// });
//
// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         createUser: {
//             type: UserType,
//             args: {
//                 id: {type: GraphQLInt},
//                 first_name: {type: GraphQLString},
//                 last_name: {type: GraphQLString},
//                 email: {type: GraphQLString},
//                 password: {type: GraphQLString},
//                 car_make: {type: GraphQLString},
//                 car_model: {type: GraphQLString}
//             },
//             resolve(parent , args){
//                 dummy_users.push({id: dummy_users.length + 1,
//                     first_name: args.first_name,
//                     last_name: args.last_name,
//                     email: args.email,
//                     password: args.password,
//                     car_make: args.car_make,
//                     car_model: args.car_model
//                 });
//                 return args;
//             }
//         }
//     }
// });
import {db} from '../db/db.mjs';
// const userDB = ()=> db('user_data').orderBy('id');

const UserType = new GraphQLObjectType({
    name : 'User',
    fields: ()=>({
        id: {type: GraphQLInt},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        email: {type: GraphQLString},
        working_sector: {type: GraphQLString},
        car_make: {type: GraphQLString},
        car_model: {type: GraphQLString},
        car_model_year: {type: GraphQLInt},
        car_vin_number: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                // console.log(this.args);
                return  db('user_data').orderBy('id');
            }
        },
        user_by_id:{
            type: new GraphQLList(UserType),
            args:{
                id:{type: GraphQLInt}
            },
            resolve(parent, args){
                return db('user_data').where({'id': args.id})
                    .returning('*');
            }

        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                first_name: {type: GraphQLString},
                last_name: {type: GraphQLString},
                email: {type: GraphQLString},
                working_sector: {type: GraphQLString},
                car_make: {type: GraphQLString},
                car_model: {type: GraphQLString},
                car_model_year: {type: GraphQLInt},
                car_vin_number: {type: GraphQLString}
            },
            resolve(parent , args){


                const data = async()=>{
                    let data1;
                    data1 = await db('user_data').insert({
                        first_name: args.first_name,
                        last_name: args.last_name,
                        email: args.email,
                        working_sector: args.working_sector,
                        car_make: args.car_make,
                        car_model: args.car_model,
                        car_model_year: args.car_model_year,
                        car_vin_number: args.car_vin_number
                    }).returning('*');
                    // console.log(data1);
                    return data1[0];
                }
                return data();

                // return db('user_data').insert({
                //     first_name: args.first_name,
                //     last_name: args.last_name,
                //     email: args.email,
                //     working_sector: args.working_sector,
                //     car_make: args.car_make,
                //     car_model: args.car_model,
                //     car_model_year: args.car_model_year,
                //     car_vin_number: args.car_vin_number
                // }).returning('*');
            }
        },

        update_user: {
            type: UserType,
            args:{
                id: {type: GraphQLInt},
                column_name: {type: GraphQLString},
                updated_data: {type: GraphQLString}
            },
            async resolve(parent, args) {

                // return db('user_data').where({id: args.id}).update({
                //     [args.column_name]: args.updated_data,
                //     updated_at: db.fn.now()
                // })
                //     .returning('*');

                const data = async()=>{
                    let data1;
                    data1 = await db('user_data').where({id: args.id}).update({
                        [args.column_name]: args.updated_data,
                        updated_at: db.fn.now()
                    })
                        .returning('*');
                    // console.log(data1);
                    return data1[0];
                }
                return data();
            }
        },

        delete_user: {
            type: UserType,
            args:{
                id: {type: GraphQLInt}
            },
            resolve(parent, args){

                const data = async()=>{
                    let data1;
                    data1 = await db('user_data').where({id:args.id}).del()
                        .returning("*");
                    // console.log(data1);
                    return data1[0];
                }
                return data();

                // return db('user_data').where({id:args.id}).del()
                //     .returning("*");
            }
        }


    }
});

export const schema = new GraphQLSchema({
    // name: "Schema",
    query: RootQuery,
    mutation: Mutation
});


// import dummy_users from '../dummy_data/MOCK_DATA.json' with { type: "json" };
// dummy_users.push({id: dummy_users.length + 1,
//     first_name: "args.first_name",
//     last_name: "args.last_name",
//     email: "args.email",
//     password: "args.password",
//     car_make: "args.car_make",
//     car_model: "args.car_model"
// });

// console.log(dummy_users.length)

// console.log(dummy_users)