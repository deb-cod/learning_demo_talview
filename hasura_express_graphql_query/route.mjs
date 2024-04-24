import express from 'express';
import {HasuraLogic} from "./logic.mjs";

const hasura_logic = new HasuraLogic();
const router = express.Router();

router.get('/mock_data_by_id/:id', hasura_logic.mock_data_1);
router.post('/update_car_vin_by_id/:id', hasura_logic.update_car_vin);

export default router;