import cached from "../../../util/cached.js";
import { calculateTodayMidnight } from "../../../util/day.js";
import { GameRepository } from "../repository/game.repository.js";

export class GameService {
    constructor(){
        this.gameRepository = new GameRepository();
    }
    
    async getTopData(getTopDataDTO) {
        try {
            const { gameCode, birth, score } = getTopDataDTO;
            let top = cached.get(gameCode, birth); // 현재 게임 기록 중 같은 년생의 최고 기록을 가져옴

            if (top === undefined || top < score) { // 최고 기록과 비교해서 현재 score가 더 높으면 해당 기록이 최고기록 
                top = score;
                cached.set(gameCode, birth, top);
                cached.save();
            }
            return top;
        } catch (err) {
            throw err;
        }
    }

    async saveRecordData(saveRecordDataDTO) {
        try {
            const { top, userId, gameCode, elapsed, correct, incorrect, score } = saveRecordDataDTO;

            const PERCENT = 100;
            const todayMidnight = calculateTodayMidnight();
            
            let record = await this.gameRepository.findRecordData(userId, todayMidnight, gameCode);
    
            if (record === null) {
                record = await this.gameRepository.createRecordData(userId, todayMidnight, gameCode);
            }

            record.count++;
            record.elapsed += elapsed;
            record.correct += correct;
            record.incorrect += incorrect;
    
            if (record.top < score) { // 현재 기록이 자신의 최고 기록을 넘었을 경우 
                record.top = score; // 자신의 최고 기록으로 설정
                record.rate = ((1 - record.top / top) * PERCENT).toFixed(1); // 소수점 첫째 자리 반올림
            }
    
            return await this.gameRepository.saveRecordData(record);
        } catch (err) {
            throw err;
        }
    }

    async saveGameData(saveGameDataDTO) {
        try {
            const { userId, gameCode, score } = saveGameDataDTO;
            let game = await this.gameRepository.findGameData(userId, gameCode);

            if (game === null) { // 현재 게임 정보가 없을 경우
                return await this.gameRepository.createGameData(userId, gameCode, score);   
            }
            
            if (game.top < score) { // 최고 점수를 갱신할 경우
                game.top = score;
                return await this.gameRepository.saveGameData(game);
            }
            return game; // 최고 점수를 넘지 못했을 경우
        } catch (err) {
            throw err;
        }
    }
}
