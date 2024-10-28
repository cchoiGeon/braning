import cached from "../../../util/cached.js";
import { GameRepository } from "../repository/game.repository.js";

export class GameService {
    constructor(){
        this.gameRepository = new GameRepository();
    }
    async getTopData(gameCode,birth,score){
        try{
            let top = cached.get(gameCode, birth); // 현재 게임 기록 중 같은 년생의 최고 기록을 가져옴

            if (top == undefined || top < score) { // 최고 기록과 비교해서 지금 score가 더 높으면 해당 기록이 최고기록 
                top = score
                cached.set(gameCode, birth, top);
                cached.save();
            }
            return top;
        }catch(err){
            throw err;
        }
    }

    async saveRecordData(top,userId,gameCode,elapsed,correct,incorrect,score){
        try{
            let date = (Date.now() / 86400000 | 0) * 86400000; // 사용자의 하루 기록을 관리코드. 현재 시간을 기준으로 오늘 자정(00:00)의 타임스탬프를 계산
            let record = await this.gameRepository.findRecordData(userId,date,gameCode);
    
            if (record == null){
                record = await this.gameRepository.createRecordData(userId,date,gameCode);
            };

            record.count++  
            record.elapsed += elapsed
            record.correct += correct
            record.incorrect += incorrect
    
            if (record.top < score) { // 현재의 기록이 예전 자신의 기록보다 높을 경우 
                record.top = score // 자신의 최고 기록을 현재 기록으로 설정 
                record.rate = ((1 - record.top / top) * 100).toFixed(1) // toFixed는 소수점 첫 번째 자리까지 반올림한다는 뜻 ,top 즉, (1- (자신의 최고 기록 / 현재 해당 게임의 최고 기록))* 100
            } // 사용자는 전체 최고 점수에 비해 record.rate% 부족하다.
    
            return await this.gameRepository.saveRecordData(record);
        }catch(err){
            throw err;
        }
    }

    async saveGameData(userId,gameCode,score){
        try{
            let game = await this.gameRepository.findGameData(userId,gameCode);
            if (game == null){ // 현재 게임 정보가 없을 경우 
                return await this.gameRepository.createGameData(userId,gameCode,score);   
            }
            if (game.top < score) { // 사용자 게임 최고 점수를 넘었을 경우 점수 갱신 
                game.top = score;
                return await this.gameRepository.saveGameData(game);
            }
            return game; // 게임 정보가 있지만 최고 점수를 넘지 못했을 경우 
        }catch(err){
            throw err;
        }
    }

}