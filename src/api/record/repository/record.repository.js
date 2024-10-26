import Record from "../../../../model/record.js";

export class RecordRepository {
    async getRecordById(userId){
        try{
            return await Record.find({ user: userId, date: { $gt: Date.now() - 691200000 } }).sort({ date: -1 });
        }catch(err){
            throw err;
        }
    }
}