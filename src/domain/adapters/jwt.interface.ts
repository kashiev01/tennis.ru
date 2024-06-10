export interface IJwtPayload {
  phone: string;
  id: number;
}

export interface IJwtResponse {
  access_token: string;
}

// export interface IJwtPayload {
//   checkToken(token: string): Promise<any>;
//   createToken(
//     payload: IJwtServicePayload,
//     secret: string,
//     expiresIn: string,
//   ): string;
// }
