export class Authenticate {
  constructor({ token, role, store_code, firstLogin }) {
    Object.assign(this, {
      token: token,
      firstLogin: firstLogin,
    });
  }
}
