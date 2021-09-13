export declare type SanityDocument<T extends Record<string, any> = Record<string, any>> = {
    [P in keyof T]: T[P];
} & {
    _id: string;
    _rev: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
};
export interface SanityRef {
    _ref: string;
}
export interface ApiError {
    statusCode: number;
    error: string;
    message: string;
}
export interface SanityWebhookV1Body {
    ids: {
        created: string[];
        deleted: string[];
        updated: string[];
    };
}
export interface SanityWebhookV2Body {
    __webhooksVersion: "v2";
    operation: "create" | "update" | "delete";
    documentId: string;
    projectId?: string;
    dataset?: string;
    after?: SanityDocument;
}
export declare type SanityWebhookBody = SanityWebhookV1Body | SanityWebhookV2Body;
