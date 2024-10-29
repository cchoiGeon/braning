import Record from "../../../../model/record.js";

export class RecordRepository {
    async getRecordById(userId,lastEightDays){
        try{
            return await Record.find({ user: userId, date: { $gt: lastEightDays } }).sort({ date: -1 });
        }catch(err){
            throw err;
        }
    }
}