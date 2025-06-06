import { PlatformsGames } from "./platformsgames";

export interface Platform {
    id: number;
    name: string;
    releaseDate: Date;
    detail?: string;
    picture?: string;
    games?: PlatformsGames[];
}