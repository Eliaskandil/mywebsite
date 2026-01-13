        
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const pb = new PocketBase('http://privx.duckdns.org:12520');
        let potato = 0
        let usre = 0
        const dcb = document.getElementById("discrodB")
        const emb = document.getElementById("emialB")
        const lgt = document.getElementById("logintext")
        const emp = document.getElementById("emailinp")
        const emaildial = document.getElementById("LoginUsingEmail")
        const loginB1 = document.getElementById("loginB1")
        const loginB2 = document.getElementById("loginB2")
        const OTPINP = document.getElementById("OTPinp")
        pb.authStore.clear()
        requestAnimationFrame(loop)
        function loop() {
            {
                requestAnimationFrame(loop)
                for(let i=0;i<document.getElementsByClassName("input").length;i++){
                    document.getElementsByClassName("input")[i].style.fontSize = window.innerWidth/(Math.PI+0.5) + "%"
                    document.getElementsByClassName("input")[i].style.width = "20%"
                }
                if (potato == 1){
                    document.getElementById("submition1").style.backgroundColor = "green"
                    document.getElementById("submition1").style.fontSize = String(Number(document.getElementById("submition1").style.fontSize.substr(0,3)) + (185-Number(document.getElementById("submition1").style.fontSize.substr(0,3)))/5) + "%"
                }else if(potato == 0){
                    document.getElementById("submition1").style.backgroundColor = "#33EE33"
                    document.getElementById("submition1").style.fontSize = String(Number(document.getElementById("submition1").style.fontSize.substr(0,3)) + (200-Number(document.getElementById("submition1").style.fontSize.substr(0,3)))/5) + "%"
                }else{
                    document.getElementById("submition1").style.fontSize = String(Number(document.getElementById("submition1").style.fontSize.substr(0,3)) + (160-Number(document.getElementById("submition1").style.fontSize.substr(0,3)))/5) + "%"
                }
            }
            {
                let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
                if(theme){
                    document.body.style.backgroundColor = "black"
                    for(let i=0;i<document.getElementsByClassName("input").length;i++){
                        document.getElementsByClassName("input")[i].style.backgroundColor = "black"
                        document.getElementsByClassName("input")[i].style.borderColor = "white"
                        document.getElementsByClassName("input")[i].style.color = "white"
                    }
                    for(let i=0;i<document.getElementsByClassName("tesxt").length;i++){
                        document.getElementsByClassName("tesxt")[i].style.color = "white"
                    }
                    document.getElementById("emialB").style.backgroundColor = "white"
                    document.getElementById("emialB").style.color = "black"
                }else{
                    document.body.style.backgroundColor = "white"
                    for(let i=0;i<document.getElementsByClassName("input").length;i++){
                        document.getElementsByClassName("input")[i].style.backgroundColor = "white"
                        document.getElementsByClassName("input")[i].style.borderColor = "black"
                        document.getElementsByClassName("input")[i].style.color = "black"
                    }
                    for(let i=0;i<document.getElementsByClassName("tesxt").length;i++){
                        document.getElementsByClassName("tesxt")[i].style.color = "black"
                    }
                    document.getElementById("emialB").style.backgroundColor = "black"
                    document.getElementById("emialB").style.color = "white"
                }
            }
        }
        function submit1(){
            
            potato = 2
        }
        
        async function submit2(){
            potato = 1
            let mation = confirm("You sure these submissions are worthy enough of being voted?")
            if(mation){
                let text1 = Number(document.getElementById("input").value)
                let text2 = Number(document.getElementById("input2").value)
                let text3 = Number(document.getElementById("input3").value)
                if((text1)&&(text2)&&(text3)){
                    if(pb.authStore.isValid){
                        const numcol = pb.collection("numbers")
                        let emiail = usre.record.email
                        let rec = 0
                        let real = (emiail.trim()).split(".")
                        let real2 = ""
                        for(i=0;i<real.length;i++){
                            real2 += real[i]
                        }
                        try{rec = await numcol.getFirstListItem(`email="${real2}"`)}catch(error){}
                        if(rec){
                            alert("HEYY YOU'VE ALREADY SUBMITTED NUMBERS >:(")
                        }else{
                            const recrod = await numcol.create({
                                number1: text1,
                                number2: text2,
                                number3: text3,
                                email: real2
                            })
                            alert("GGs, your submissions shall now be considered!")
                        }
                    }else{
                        alert("do you not see the login buttons?")
                    }
                    
                }else{
                    let nice = []
                    if(!text1){nice.push("1st")}
                    if(!text2){nice.push("2nd")}
                    if(!text3){nice.push("3rd")}
                    if (nice.length==1){
                        alert(`you cheeky boi, the ` + nice[0] + ` submission isn't a number!`)
                    }else{
                        let str = ""
                        for(let i=0;i<nice.length;i++){
                            if((i+1)==nice.length){str += "and " + nice[i]}else{str += nice[i] +", "}   
                        }
                        alert(`you cheeky boi, the ` + str + ` submissions aren't numbers!`)
                    }
                }
            }
        }
        function enterm(){
            potato = 1
        }
        function leavem(){
            potato = 0
        }
        function login(){
            dcb.style.display = 'none'
            emb.style.display = 'none'
        }
        async function dislin() {
            try{usre = await pb.collection('users').authWithOAuth2({ provider: 'discord' })}catch(error){}
            if(usre){
                login()
            }
        }
        async function mailin() {
            emaildial.style.display = "inline-block"
            loginB2.style.display = "none"
            OTPINP.style.display = "none"
            for(let op=1;op<=25;op++){
                emaildial.style.opacity = op/25
                emaildial.style.top = (19 + (op/24)) + "%"
                await delay(1)
            }
        }
        let result = 0
        async function email1(){
            const usress = pb.collection("users")
            lgt.innerText = "..."
            emp.style.display = 'none'
            loginB1.style.display = 'none'
            let pas2s = Math.random().toString(36).substring(2,12)
            let recuser;
            try{
                recuser = await usress.create({'email': emp.value,'password': pas2s,'passwordConfirm': pas2s})
            }catch(e){console.log("exists")}
            await delay(1000)
            try{result = await usress.requestOTP(emp.value);}catch(E){}
            emp.style.display = 'inline-block'
            emp.contentEditable = false
            loginB2.style.display = 'inline-block'
            OTPINP.style.display = "inline-block"
            lgt.innerText = "Please enter the OTP we sent to your email"
        }
        async function email2(){
            const usress = pb.collection("users")
            try{usre = await usress.authWithOTP(result.otpId, OTPINP.value)}catch{alert("Something wrong went on (maybe you wrote the OTP wrong?)")}
                if(usre&&pb.authStore.isValid){
                    login()
                    emaildial.style.display = "none"
                }
        }
        document.getElementById("submition1").addEventListener('click',submit2)
        dcb.addEventListener('click', dislin)
        emb.addEventListener('click',mailin)
        loginB1.addEventListener('click',email1)
        loginB2.addEventListener('click',email2)