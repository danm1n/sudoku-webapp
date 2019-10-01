import axios from 'axios';

const Auth = {
    isAuthenticated: false,
   async check()  {
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
        if(jwt !== ""){
       await axios.post(`/checker`, jwt)
        .then(res => {
            this.isAuthenticated = res.data.response
        })
    }
    },
   getAuth() {
        return this.isAuthenticated;
      }
  };

  export default Auth;