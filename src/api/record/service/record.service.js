import { RecordRepository } from "../repository/record.repository.js";

export class RecordService {
    constructor(){
        this.recordRepository = new RecordRepository();
    }

    async getUserRecord(userId){
        try{
            const EIGHTDAYS = 691200000;
            const lastEightDays =  Date.now() - EIGHTDAYS;
            const existData = await this.recordRepository.getRecordById(userId,lastEightDays);
            if(!existData){
                throw new Error('NOT_EXIST_DATA');
            }
            return existData;
        }catch(err){
            throw err;
        }
    }
}