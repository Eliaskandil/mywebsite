class api{
    async sammyreq(METHOD,ENDPOINT,BODY){
        let path = "https://sanojo.com/"
        path = "localhost:8081/"
        if(METHOD=="POST"){
            const res = await fetch(path + ENDPOINT,{body:JSON.stringify(BODY),method:"POST"})
            return res
        }
        if(METHOD=="GET"){
            const res = await fetch(path + ENDPOINT)
            return res
        }
    }
}