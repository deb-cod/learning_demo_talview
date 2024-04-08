import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import dummy_users from '../dummy_data/MOCK_DATA.json' assert { type: "json" };



const UserType = new GraphQLObjectType({
    name : 'User',
    fields: ()=>({
        id: {type: GraphQLInt},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        car_make: {type: GraphQLString},
        car_model: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                return dummy_users;
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
                password: {type: GraphQLString},
                car_make: {type: GraphQLString},
                car_model: {type: GraphQLString}
            },
            resolve(parent , args){
                dummy_users.push({id: dummy_users.length + 1,
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    password: args.password,
                    car_make: args.car_make,
                    car_model: args.car_model
                });
                return args;
            }
        }
    }
});

export const schema = new GraphQLSchema({
    // name: "Schema",
    query: RootQuery,
    mutation: Mutation
});