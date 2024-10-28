import Game from "../../../../model/game.js";
import Record from "../../../../model/record.js";
import cached from "../../../cached/cached.js"

export async function saveGameResult(req,res){
    try{
        const {authed,birth} = res.locals;
        const {gameCode} = req.params;
        const {score,elapsed,correct,incorrect} = req.body;
        
        let top = cached.get(gameCode, birth); // 현재 게임 기록 중 같은 년생의 최고 기록을 가져옴

        if (top == undefined || top < score) { // 최고 기록과 비교해서 지금 score가 더 높으면 해당 기록이 최고기록 
            top = score
            cached.set(gameCode, birth, top);
            cached.save();
        }

        let date = (Date.now() / 86400000 | 0) * 86400000; // 사용자의 하루 기록을 관리코드. 현재 시간을 기준으로 오늘 자정(00:00)의 타임스탬프를 계산
        let record = await Record.findOne({ user: authed, date: date, code: gameCode }); // 오늘 게임한 데이터가 있는지 확인후 있으면 해당 기록에 현재 기록을 추가해주고 없으면 새로 만듬

        if (record == null){
            record = await Record.create({
                user: authed,
                date: date,
                code: gameCode,
            });
        };
        
        record.count++  
        record.elapsed += elapsed
        record.correct += correct
        record.incorrect += incorrect
        if (record.top < score) { // 현재의 기록이 예전 자신의 기록보다 높을 경우 
            record.top = score // 자신의 최고 기록을 현재 기록으로 설정 
            record.rate = ((1 - record.top / top) * 100).toFixed(1) // toFixed는 소수점 첫 번째 자리까지 반올림한다는 뜻 ,top 즉, (1- (자신의 최고 기록 / 현재 해당 게임의 최고 기록))* 100
        } // 사용자는 전체 최고 점수에 비해 record.rate% 부족하다.

        await record.save();

        let game = await Game.findOne({ user: authed, code: gameCode });
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

        return res.status(200).json(game)
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal server error.');
    }
}