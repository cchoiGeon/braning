import logger from "../../../util/logging.js";
import { RecordService } from "../service/record.service.js"

const recordService = new RecordService();

export async function getUserRecords(req,res){
    try {
        const { userId } = res.locals;

        const result = await recordService.getUserRecord(userId);

        return res.status(200).json(result);
    } catch (err) {
        logger.warn("Record/GetUserRecords Error : ",err);
        if(err.message == 'NOT_EXIST_DATA'){
            return res.status(401).send('unauthorized.');
        }
        return res.status(500).send('Internal server error.');
    }
}