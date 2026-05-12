import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type SubmitResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface SubmitContactInput {
    name: string;
    email: string;
    company?: string;
    message: string;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    company?: string;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    getContacts(): Promise<Array<ContactSubmission>>;
    submitContact(input: SubmitContactInput): Promise<SubmitResult>;
}
