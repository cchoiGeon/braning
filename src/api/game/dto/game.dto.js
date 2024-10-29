export class GetTopDataDTO {
    constructor({ gameCode, birth, score }) {
        this.gameCode = gameCode;
        this.birth = birth;
        this.score = score;
    }
}
export class SaveRecordDataDTO {
    constructor({ top, userId, gameCode, elapsed, correct, incorrect, score }) {
        this.top = top;
        this.userId = userId;
        this.gameCode = gameCode;
        this.elapsed = elapsed;
        this.correct = correct;
        this.incorrect = incorrect;
        this.score = score;
    }
}
export class SaveGameDataDTO {
    constructor({ userId, gameCode, score }) {
        this.userId = userId;
        this.gameCode = gameCode;
        this.score = score;
    }
}
