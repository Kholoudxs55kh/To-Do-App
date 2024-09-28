export default class TaskDto {
    public id: string;
    public name: string;
    public isDone: boolean;
    public isDeleted: boolean;

    constructor(bodyReq: taskI) {
        this.id = bodyReq.id;
        this.name = bodyReq.name;
        this.isDone = bodyReq.isDone;
        this.isDeleted = bodyReq.isDeleted;
    }
}