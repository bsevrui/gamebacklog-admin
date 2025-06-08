export interface UpdateGame {
    title?: string;
    type?: 'Game' | 'DLC/Expansion';
    cover?: string;
    genres?: number[];
}