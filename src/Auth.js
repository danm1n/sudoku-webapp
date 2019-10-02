import axios from 'axios';

const Auth = {
    isAuthenticated: false,
    isUsername: "",
    token: "",
    async check() {
        let jwt = {
            token: "",
        }
        jwt.token = localStorage.getItem('sudo')
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