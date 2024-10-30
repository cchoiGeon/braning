import logger from "../../../util/logging.js";
import { gameCodeSchema, saveGameDataSchema } from "../../../vaild/game.vaild.js";
import { GetTopDataDTO, SaveGameDataDTO, SaveRecordDataDTO } from "../dto/game.dto.js";
import { GameService } from "../service/game.service.js";

const gameService = new GameService();

export async function saveGameResult(req,res){
    try{
        const { userId, birth } = res.locals;

        const { error: paramsError, value: paramsValue } = gameCodeSchema.validate(req.params);
        if (paramsError) {
            return res.status(400).json({ errorMessage: paramsError.details[0].message });
        }
        
        // body 데이터 검증
        const { error: bodyError, value: bodyValue } = saveGameDataSchema.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ errorMessage: bodyError.details[0].message });
        }
        
        // 검증된 값들로 DTO 인스턴스 생성 및 서비스 호출
        const getTopDataDTO = new GetTopDataDTO({ 
            gameCode: paramsValue.gameCode, 
            birth, 
            score: bodyValue.score 
        });
        const top = await gameService.getTopData(getTopDataDTO);

        const saveRecordDataDTO = new SaveRecordDataDTO({ 
            top, 
            userId, 
            gameCode: paramsValue.gameCode, 
            elapsed: bodyValue.elapsed, 
            correct: bodyValue.correct, 
            incorrect: bodyValue.incorrect, 
            score: bodyValue.score 
        });
        await gameService.saveRecordData(saveRecordDataDTO);

        const saveGameDataDTO = new SaveGameDataDTO({ 
            userId, 
            gameCode: paramsValue.gameCode, 
            score: bodyValue.score 
        });
        const game = await gameService.saveGameData(saveGameDataDTO);
        
        return res.status(200).json(game);
    }catch(err){
        logger.warn("Game/SaveGameResult Error : ",err);
        return res.status(500).send('Internal server error.');
    }
}