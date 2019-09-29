const Auth = {
    isAuthenticated: true,
    authenticate() {
      this.isAuthenticated = true;
    },
    signout() {
      this.isAuthenticated = false;
    },
    getAuth() {
        return this.isAuthenticated;
      }
  };

  export default Auth;