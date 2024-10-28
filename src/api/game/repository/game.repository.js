import Game from "../../../../model/game.js";
import Record from "../../../../model/record.js";

export class GameRepository {
    async findRecordData(userId,date,gameCode){
        try{
            return await Record.findOne({ user: userId, date: date, code: gameCode }); 
        }catch(err){
            throw err;
        }
    }

    async createRecordData(userId,date,gameCode){
        try{
            return await Record.create({
                user: userId,
                date: date,
                code: gameCode,
            });
        }catch(err){
            throw err;
        }
    }

    async saveRecordData(record){
        try{
            return await record.save();
        }catch(err){
            throw err;
        }
    }

    async findGameData(userId,gameCode){
        try{
            return await Game.findOne({ user: userId, code: gameCode });
        }catch(err){
            throw err;
        }
    }

    async createGameData(userId,gameCode,score){
        try{
            return await Game.create({
                user: userId,
                code: gameCode,
                top: score,
            })
        }catch(err){
            throw err;
        }
    }

    async saveGameData(game){
        try{
            return await game.save();
        }catch(err){
            throw err;
        }
    }
}   