let credentials = {
    check: (data)=>{
        if(!data.token) return false

        return credentials._store(data)
    },

    _store: (data) =>{
        try {
            window.localStorage.setItem('token', data.token);
           // window.localStorage.setItem('user', JSON.stringify(data.user))
            return true
        } catch (error) {
            console.log(error);
        }
    },

    _clear: () =>{
        window.localStorage.removeItem('token');
        
    },

    getToken: () =>{
        return window.localStorage.getItem('token')
    },

   

}

export default credentials
