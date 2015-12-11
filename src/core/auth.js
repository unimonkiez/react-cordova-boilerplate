import history from './history';

let authenticated = false;
const hint = 'password1';

function pretendLoginRequest(email, pass, cb) {
  setTimeout(() => {
    if (pass === hint) {
      cb({
        authenticated: true,
        time: Date.now(),
        token: Math.random().toString(36).substring(7)
      });
    } else {
      cb({
        authenticated: false,
        hint
      });
    }
  }, 500);
}
function pretendTokenRequest(token, cb) {
  setTimeout(() => {
    if (!!token) {
      cb({
        authenticated: true,
        time: Date.now(),
        token
      });
    } else {
      cb({
        authenticated: false
      });
    }
  }, 300);
}
export default {
  getAuthenticated() {
    return authenticated;
  },
  setAuthenticated(newAuthenticated) {
    const prevAuthenticated = authenticated;
    authenticated = newAuthenticated;

    // Change url if authenticated have been changed from before
    if (prevAuthenticated !== authenticated) {
      history.pushState(null, '/');
    }
  },
  login(email, pass, cb) {
    pretendLoginRequest(email, pass, res => {
      if (res.authenticated) {
        this.setAuthenticated(true);
        localStorage.token = res.token;
        localStorage.time = res.time;
        if (cb) {
          cb();
        }
      } else {
        this.setAuthenticated(false);
        if (cb) {
          cb(res.hint);
        }
      }
    });
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    this.setAuthenticated(false);
    delete localStorage.token;
    if (cb) {
      cb(false);
    }
  },

  // If doesn't have token or login time has passed, do not validate the token against the server.
  loggedIn(cb) {
    setTimeout(() => {
      if (!localStorage.token || localStorage.time <= Date.now() - 1000 * 60) {
        this.setAuthenticated(false);
      } else {
        pretendTokenRequest(localStorage.token, (res) => {
          this.setAuthenticated(res.authenticated);
        });
      }
      cb();
    }, 2000);
    return true;
    // let isAsync = false;
    // if (!localStorage.token || localStorage.time <= Date.now() - 1000 * 60) {
    //   this.setAuthenticated(false);
    // } else {
    //   pretendTokenRequest(localStorage.token, (res) => {
    //     this.setAuthenticated(res.authenticated);
    //     cb();
    //   });
    //   isAsync = true;
    // }
    // return isAsync;
  }
};
