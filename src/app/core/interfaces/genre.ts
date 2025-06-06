import { Game } from "./game";

export interface Genre {
    id: number;
    name: string;
    description?: string;
    games?: Game[];
}