const hint = 'password1';
function pretendLoginRequest(email, pass, cb) {
  setTimeout(() => {
    if (pass === hint) {
      cb({
        authenticated: true,
        time: Date.now(),
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({
        authenticated: false,
        hint
      })
    }
  }, 0)
}
function pretendTokenRequest(token, cb) {
  setTimeout(() => {
    if (!!token) {
      cb({
        authenticated: true,
        time: Date.now(),
        token
      })
    } else {
      cb({
        authenticated: false
      })
    }
  }, 0)
}

export default {
  onChangeHandlers: [],
  login(email, pass, cb) {
    pretendLoginRequest(email, pass, res => {
      if (res.authenticated) {
        localStorage.token = res.token;
        localStorage.time = res.time;
        if (cb) {
          cb(true);
        }
        this.onChange(true)
      } else {
        if (cb) {
          cb(false, res.hint);
        }
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token;
    if (cb) {
      cb(false);
    }
    this.onChange(false)
  },

  // If doesn't have token or login time has passed, do not validate the token against the server.
  loggedIn(cb) {
    if (!localStorage.token || localStorage.time <= Date.now() - 1000 * 60) {
      cb(false);
    } else {
      pretendTokenRequest(localStorage.token, (res) => {
        cb(res.authenticated);
      });
    }
  },

  onChange(authenticated) {
    this.onChangeHandlers.forEach(handler => {
      handler(authenticated);
    });
  },

  registerOnChangeHandler(handler) {
    const typeOfHandler = typeof handler;
    if (typeOfHandler !== 'function') {
      throw `registerOnChangeHandler accepts only a function, got ${typeOfHandler}`;
    }
    this.onChangeHandlers.push(handler);
    return this.unregisterOnChangeHandler.bind(this, handler);
  },

  unregisterOnChangeHandler(handler) {
    const indexOfHandler = this.onChangeHandlers.indexOf(handler);
    if (indexOfHandler !== -1) {
      this.onChangeHandlers.splice(indexOfHandler, 1);
    }
  }
}
