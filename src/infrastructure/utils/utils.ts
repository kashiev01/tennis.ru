import * as bcrypt from 'bcrypt';

export const genHash = async (
  password: string | Buffer,
  salt: string | number,
) => bcrypt.hash(password, salt);

export const genSalt = async () => bcrypt.genSalt();

export const compareHash = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);
