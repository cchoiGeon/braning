import { GameService } from "../service/game.service.js";

const gameService = new GameService();

export async function saveGameResult(req,res){
    try{
        const {authed,birth} = res.locals;
        const userId = authed;
        const {gameCode} = req.params;
        const {score,elapsed,correct,incorrect} = req.body;
        

        let top = await gameService.getTopData(gameCode,birth,score);

        await gameService.saveRecordData(top,userId,gameCode,elapsed,correct,incorrect,score);

        let game = await gameService.saveGameData(userId,gameCode,score);
        
        return res.status(200).json(game)
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal server error.');
    }
}