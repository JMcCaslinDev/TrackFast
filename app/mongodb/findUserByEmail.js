import Account from './accountModel';

export async function findUserByEmail(email) {
  return Account.findOne({ email });
}
