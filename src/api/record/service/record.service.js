import { RecordRepository } from "../repository/record.repository.js";

export class RecordService {
    constructor(){
        this.recordRepository = new RecordRepository();
    }

    async getUserRecord(userId){
        try{
            const existData = await this.recordRepository.getRecordById(userId);
            if(!existData){
                throw new Error('NOT_EXIST_DATA');
            }
            return existData;
        }catch(err){
            throw err;
        }
    }
}