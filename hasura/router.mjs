import express from 'express';
import {HasuraLogic} from "./logic.mjs";

const hasura_logic = new HasuraLogic();

const router = express.Router();

router.post('/createanotheruser', hasura_logic.create_another_user);
router.put('/insert_event', hasura_logic.insert_event);

export default router;