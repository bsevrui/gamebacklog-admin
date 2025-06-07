export interface UpdateUser {
    username?: string;
    role?: 'ADMIN' | 'USER';
    birthdate?: Date;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
}