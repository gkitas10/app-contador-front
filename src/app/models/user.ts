export class User{
    constructor(
        public _id:string,
        public name:string,
        public email:string,
        public password:string,
        public img: string,
        public role:string,
        public status:boolean,
        public google:boolean,
       

    ){

    }
}