declare global {
    interface taskI {
        id: string;
        name: string;
        description?: string;
        label: string[];
        isDone: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }

    interface taskCreateI {
        name: string;
        description?: string;
        label: string[];
    }

    interface taskUpdateI {
        id: string;
        name?: string;
        description?: string;
        label?: string[];
        isDone?: boolean;
        isDeleted?: boolean;
    }
}

export {};