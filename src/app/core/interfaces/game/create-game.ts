export interface CreateGame {
    title: string;
    type: 'Game' | 'DLC/Expansion';
    cover?: string;
}