const HttpError = require('../models/http-error');
const{uuid}=require('uuidv4');
const DUMMY_USERS = [
    {

        id:'u1',
        name:'keymi momo',
        email:'keymi.momotic@galileo.edu',
        password:'12345'
    }
];


const getUsers=(req,res,next) =>{
    const userId= req.params.id;
    const user = DUMMY_USERS.filter(id => {
        return(id === userId)
    });

    if(!DUMMY_USERS){
        throw new HttpError('no se puede encontrar ningun usuario',404)
    }
    res.json({user: DUMMY_USERS})

};
const singup=(req,res,next) =>{
//creamos usuario nuevo,se necesita un json (name,email,password)
//crear un id nuevo -random en js o paquete llamado iiid_v4
const{id,name,email,password} =req.body;
const createdUser = {

    id: uuid(),
    name,
    email,
    password
}
DUMMY_USERS.push(createdUser);
res.json({user:createdUser});
res.status(201).json({message:"se agrego"});
};


const login=(req,res,next) =>{
    //devolver verdadero/falso si se puede haver login
    //mandamos por json email, password
const login = (req,res,next)=>{
    const {email, password}=req.body;
    console.log(req.body);
    const user = DUMMY_USERS.filter(p=>{
        return(p.email=== email && p.password === password)
    });
    if(!user){
        throw new HttpError('error en el login', 404);
    }
    res.json({user: user})
}



};

exports.getUsers = getUsers;
exports.singup = singup;
exports.login = login;