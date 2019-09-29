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
        // console.log(`token:${jwt.token}`)
        if(jwt !== ""){
        axios.post(`/checker`, jwt)
        .then(res => {
            this.isAuthenticated = res.data.response
        })
    }
    },
    getAuth() {
        this.check()
        console.log(this.isAuthenticated)
        return this.isAuthenticated;
      }
  };

  export default Auth;