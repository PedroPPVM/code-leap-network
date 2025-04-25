declare namespace Carrer {
    export type Entity = {
        id?: number;
        username: string;
        created_datetime: string;
        title: string;
        content: string;
        author_ip: string;
    };

    export type CreatePayload = {
        username: string;
        title: string;
        content: string;
    };

    export type UpdatePayload = {
        id: number;
        title: string;
        content: string;
    };
}