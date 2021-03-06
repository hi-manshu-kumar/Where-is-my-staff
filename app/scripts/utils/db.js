const dbOperations= {
    addQuestion(questionObject){
        firebase.database().ref('questions/').push().set(questionObject);
        console.log("Question Added...");
    },
    getQuestionById(id){
        var questionRef = firebase.database().ref('questions/'+id);
        questionRef.on('value', (snapShot) =>{
            var questionObject =snapShot.val();
            console.log("QuestionObject is",questionObject);
        })
    },
    getAllUsers() {
        var users = firebase.database().ref('users');
        users.on('value', function (snapShot) {
            var obj = snapShot.val();
            console.log("fetch__", obj);
            console.log("Type of", obj);
            for (let key in obj) {
                console.log(key, " ", obj[key]);
            }
            
        });
    },
    match(userid , pwd){
        var pr = new Promise ( (resolve,reject)=>{
            var user =firebase.database().ref('users/');// -------for multiple objects
//            var user =firebase.database().ref('users/'+1);    ----------- in this only 1 obj is returned of ram-
            
            console.log(userid);
            user.on('value', (snapShot) => {
                var obj = snapShot.val();
                console.log("fetch__", obj);
                console.log("Type of", obj.userid);
                
                for (let key in obj) {
                    console.log("key is ",key);
                    // localStorage.keyFB == key;
                    // console.log(localStorage.keyFB);
                    console.log(key, " ", obj[key]);
                    console.log(key, " ", obj[key].userid);
                    console.log(key, " ", obj[key].password);
                    console.log(key, " ", obj[key].type);
                    // if(userid == obj[key].userid){
                    //     alert("yippee");
                    // }
                    var objI =obj[key];
                    console.log(userid, objI.userid, pwd, objI.password,objI)
                    if(userid == objI.userid && pwd== objI.password){
                        //alert("yippee you are logged in");
                        // console.log(key);
                        localStorage.setItem("keyFB", key);
                        console.log(localStorage.getItem("keyFB"));
                        resolve(objI);
                    }
                }
                reject("didnt match");
                console.log("obj is ",obj);
                //reject(err);
            });
        });
        return pr;
    },
    addUser(userObject){
        firebase.database().ref('users/'+userObject.id).set(userObject);
        // firebase.database().ref('users/'.push().set(userObject);
        console.log("User Added...");
    },
    init(){

        if(!localStorage.StaffName && !localStorage.AdminName){
            document.querySelector('#logout').style.display = 'none';
            document.querySelector('#login').style.display = 'block';
            console.log("hide logout........................... ");
        }
        if(localStorage.StaffName || localStorage.AdminName){
            document.querySelector('#logout').style.display = 'block';
            document.querySelector('#login').style.display = 'none';            
            console.log("show logout........................... ");
        }
    }    
}
