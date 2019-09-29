import axios from 'axios';

const Auth = {
    isAuthenticated: false,
    check()  {
        let jwt = {
            token: "",
        }
        let cookies = document.cookie.split(';')
        for(let cookie of cookies){
            if(cookie.startsWith(' su')){
                cookie = cookie.split('=')
                jwt.token = cookie[1];
            }
        }
        console.log(`token:${jwt.token}`)
        axios.post(`/checker`, jwt)
        .then(res => {

        })
    },
    getAuth() {
        this.check()
        return this.isAuthenticated;
      }
  };

  export default Auth;