import {Query} from "./querys.mjs";
import { GraphQLClient} from "graphql-request";
import jwt from 'jsonwebtoken';

const gph_query = new Query();

const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
const adminSecret = '123';



// Generate a JWT token (if using JWT authentication)
const generateJwtToken = () => {
    const claims = {
        "sub": "1234567890",
        "name": "John Doe",
        "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": [
                "admin"
            ],
            "x-hasura-default-role": "admin"
        }
    }

    return jwt.sign(claims, '5kOnr5vYmLggihää0X9TGrQBC4PoFPgt', { expiresIn: '1h' });
};

const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        // 'x-hasura-admin-secret': adminSecret,
        'Authorization': `Bearer ${generateJwtToken()}`
    },
});
export class HasuraLogic{
    async mock_data_1(req, res) {
        try {
            const data = await client.request(gph_query.query_data_by_id(req.params.id));
            res.json(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async update_car_vin(req, res){
        // console.log(req.query.new_vin);
        try{

            const data = await client.request(gph_query.mutation_car_vin_by_id(req.params.id, req.query.new_vin));
            res.json(data);
        }catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }



}


