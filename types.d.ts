declare global {
    interface taskI {
        id: string;
        name: string;
        isDone: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }

    interface taskCreateI {
        name: string;
    }

    interface taskUpdateI {
        id: string;
        name?: string;
        isDone?: boolean;
        isDeleted?: boolean;
    }
}

export {};