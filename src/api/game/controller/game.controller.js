import Game from "../../../../model/game.js";
import Record from "../../../../model/record.js";
import cached from "../../../cached/cached.js"

export async function saveGameResult(req,res){
    try{
        const {authed,birth} = res.locals;
        const {gameCode} = req.params;
        const {score,elapsed,correct,incorrect} = req.body;
        
        let top = cached.get(gameCode, birth);

        console.log("top : ",top);

        if (top == undefined || top < score) {
            top = score
            cached.set(gameCode, birth, top)
            cached.save()
        }

        let date = (Date.now() / 86400000 | 0) * 86400000
        
        let record = await Record.findOne({ user: authed, date: date, code: gameCode })
        if (record == null){
            record = await Record.create({
                user: authed,
                date: date,
                code: gameCode,
            });
        }
        
        console.log("record : ",record);

        record.count++  
        record.elapsed += elapsed
        record.correct += correct
        record.incorrect += incorrect
        if (record.top < score) {
            record.top = score
            record.rate = ((1 - record.top / top) * 100).toFixed(1)
        }
        await record.save();
        console.log("record 저장 완료 ");
        let game = await Game.findOne({ user: authed, code: gameCode })
        if (game == null)
            return res.status(201).json(await Game.create({
                user: authed,
                code: gameCode,
                top: score,
                // records: [{ score: score }],
            }))
        if (game.top < score) {
            game.top = score
            await game.save()
        }

        console.log("game : ",game);
        return res.status(200).json(game)
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal server error.');
    }
}