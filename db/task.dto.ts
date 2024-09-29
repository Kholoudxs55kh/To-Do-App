export default class TaskDto {
    public id: string;
    public name: string;
    public description?: string;
    public label: string[];
    public isDone: boolean;
    public isDeleted: boolean;

    constructor(bodyReq: taskI) {
        this.id = bodyReq.id;
        this.name = bodyReq.name;
        this.description = bodyReq.description;
        this.label = bodyReq.label;
        this.isDone = bodyReq.isDone;
        this.isDeleted = bodyReq.isDeleted;
    }
}