const HttpError = require('../models/http-error');
let DUMMY_PLACES = [

    {
    id: "p1",
    title: "empire state",
    description: "el rascacielos mas famoso del mundo",
    location:{

        lat: 40.7484474,
        lng: -73.9871516
    },
    address: "20 w 34th 5t, New York, NY, 10001",
    creator: "u1"
    }
];




//controlador para retomar places
const getPlacesById = (req,res,next) => {
    const placeId = req.params.pid;
    const places = DUMMY_PLACES.filter(p=> {
    
    return(p.id === placeId);
    
    });
    //estructura error para responder al usuario
    if(!places){
       
            throw new HttpError('no se encontro el place con el id solicitado', 404);
        }
    
    console.log("se hizo un get en places");
    res.json({place: places});
};



// controlador para retornar place en funcion del usuario
const getPlaceByUser = (req,res,next) =>{
    const userId = req.params.uid;
    const place = DUMMY_PLACES.filter( p =>(p.creator === userId));
    
    if(!place){
        
        throw new HttpError('no se encontro places con el usuario solicitado', 404);
    }
    res.json({place: place});
}
const createPlace = (req,res,next) =>{
    const{title,description,coordinates,address,creator} = req.body;
    const createPlace={
        title,
        description,
        location:coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createPlace);
    res.status(201).json({message: 'se agrego al place exitosamente'});
    
};

const updatePlace = (req, res, next)=>{
    const{title, description} = req.body;
    const placeId = req.params.pid;

    const updatePlace = {...DUMMY_PLACES.find(p =>(p.id === placeId))};
    const placeIndex = DUMMY_PLACES.findIndex(p =>(p.id === placeId));
    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex] = updatePlace;
    console.log(DUMMY_PLACES);
    res.status(200).json({message: "sitio modificado exitosamente"})


};
const deletePlace = (req,res,next)=>{
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p =>(p.id !== placeId));
    res.status(200).json({message: 'sitio eliminado exitosamente'}
    );

}


//exportamos
exports.getPlaceById = getPlacesById;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;