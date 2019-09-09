function ice_cream(){

    let arr = [];

    function makeCombo(){
        for(var z = 0; z < 8000; z++){
            let user = {
                username: "pete" + z,
                password: 1234+z
            }
            arr.push(user)
        }
        console.log(arr)
        return arr;
    }

    function runme(){
    for(var j = 0; j < arr.length;j++){
    const requestBody = {
        username: arr[j].username,
        password: arr[j].password
      }
      console.log(requestBody)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      
      let url ="https://hangman-webapp.herokuapp.com/api/add/user/"
      axios.post(url, JSON.parse(requestBody), config)
        .then((result) => {
            console.log(result)
          // Do somthing
        })
        .catch((err) => {
          // Do somthing
        })
    }
    }


    return{
        makeCombo,
        runme
    }
}