export class User{
    constructor(
        public id:string,
        public email:string,
        private access_token:string,
        private tokenExpirationDate:Date
    ){ }

    get token(){
        if(!this.tokenExpirationDate || new Date() > this.tokenExpirationDate){
            return null;
        }
        return this.access_token;
    }
}