import * as mongodb from "mongodb";

export interface user {
    name: string;
    password: string;
    _id?: mongodb.ObjectId;
}