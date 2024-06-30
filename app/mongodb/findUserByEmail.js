import User from './userModel';

export async function findUserByEmail(email) {
  return User.findOne({ email });
}
