import { Genre } from "./genre";
import { PlatformsGames } from "./platformsgames";

export interface Game {
    id: number;
    title: string;
    type: string;
    cover?: string;
    releaseDate?: Date;
    averageScore?: number;
    popularity?: number;
    genres?: Genre[];
    platforms?: PlatformsGames[];
}