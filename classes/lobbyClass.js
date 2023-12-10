class Lobby{
  constructor(code){
    this.code = code;
    this.users = [];
  } 

  addUser(user){
    this.users.push(user);
  }

  setCode(code){
    this.code = code;
  }

  getCode(){
    return this.code;
  }


  removeUser(userId){
    this.users = this.users.filter(user => user.id != userId);
  }
}


module.exports = Lobby;