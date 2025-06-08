import { Genre } from "../genre/genre";

export interface Game {
    id: number;
    title: string;
    type: string;
    cover?: string;
    genres?: Genre[];
}