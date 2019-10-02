import axios from 'axios';

const Auth = {
    isAuthenticated: false,
    isUsername: "",
    token: "",
    async check() {
        let jwt = {
            token: "",
        }
        let cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            if (cookie.startsWith(' su')) {
                cookie = cookie.split('=')
                jwt.token = cookie[1];
            }
        }
        if (jwt !== "") {
            await axios.post(`/verify`, jwt)
                .then(res => {
                    this.isAuthenticated = res.data.response
                    this.isUsername = res.data.client_id
                    this.token = jwt.token
                })
        }
    },
    getToken() {
        return this.token
    },
    getAuth() {
        return this.isAuthenticated;
    },
    getUserName() {
        return this.isUsername
    }

};

export default Auth;