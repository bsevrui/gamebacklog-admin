import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/game/game';
import { Platform } from '../interfaces/platform/platform';
import { Genre } from '../interfaces/genre/genre';
import { User } from '../interfaces/user/user';
import { UpdateUser } from '../interfaces/user/update-user';
import { CreateGame } from '../interfaces/game/create-game';
import { UpdateGame } from '../interfaces/game/update-game';
import { UpdateGenre } from '../interfaces/genre/update-genre';
import { CreateGenre } from '../interfaces/genre/create-genre';
import { UpdatePlatform } from '../interfaces/platform/update-platform';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Constructor
   * @param http Http Client.
   */
  constructor(private http: HttpClient) {}

  /**
   * Games
   * @returns games on db
   */
  getGames(): Observable<Game []> {
    return this.http.get<Game []>(environment.apiBaseUrl+'games');
  }

  /**
   * Game
   * @param gameId game's id
   * @returns selected game's info on db
   */
  getGame(gameId: number): Observable<Game> {
    return this.http.get<Game>(environment.apiBaseUrl+'games/'+gameId);
  }

  createGame(gameData: CreateGame): Observable<any> {
    return this.http.post(environment.apiBaseUrl+'games', gameData);
  }

  updateGame(gameId: number, gameData: UpdateGame) {
    return this.http.patch(environment.apiBaseUrl+'games/'+gameId, gameData);
  }

  deleteGame(gameId: number) {
    return this.http.delete(environment.apiBaseUrl+'games/'+gameId);
  }

  /**
   * Genres
   * @returns genres on db
   */
  getGenres(): Observable<Genre []> {
    return this.http.get<Genre []>(environment.apiBaseUrl+'genres');
  }

  /**
   * Genre
   * @param genreId genre's id
   * @returns selected genre's info on db
   */
  getGenre(genreId: number): Observable<Genre> {
    return this.http.get<Genre>(environment.apiBaseUrl+'genres/'+genreId);
  }

  createGenre(genreData: CreateGenre): Observable<any> {
    return this.http.post(environment.apiBaseUrl+'genres', genreData);
  }

  updateGenre(genreId: number, genreData: UpdateGenre) {
    return this.http.patch(environment.apiBaseUrl+'genres/'+genreId, genreData);
  }

  deleteGenre(genreId: number) {
    return this.http.delete(environment.apiBaseUrl+'genres/'+genreId);
  }

  /**
   * Platforms
   * @returns platforms on db
   */
  getPlatforms(): Observable<Platform []> {
    return this.http.get<Platform []>(environment.apiBaseUrl+'platforms');
  }

  /**
   * Platform
   * @param platformId platform's id
   * @returns selected platform's info on db
   */
  getPlatform(platformId: number): Observable<Platform> {
    return this.http.get<Platform>(environment.apiBaseUrl+'platforms/'+platformId);
  }

  updatePlatform(platformId: number, platformData: UpdatePlatform) {
    return this.http.patch(environment.apiBaseUrl+'platforms/'+platformId, platformData);
  }

  deletePlatform(platformId: number) {
    return this.http.delete(environment.apiBaseUrl+'platforms/'+platformId);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User []>(environment.apiBaseUrl+'users');
  }

  /**
   * Get User
   * @param userId user's id
   * @returns selected user's data on db
   */
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.apiBaseUrl+'users/'+userId);
  }

  updateUser(userId: number, userData: UpdateUser) {
    return this.http.patch(environment.apiBaseUrl+'users/'+userId, userData);
  }

  deleteUser(userId: number) {
    return this.http.delete(environment.apiBaseUrl+'users/'+userId);
  }
}