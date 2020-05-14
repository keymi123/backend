const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/user-routes');
// creamos aplicacion
const app = express();

app.use(bodyParser.json());
//middleware
app.use('/api/places', placesRoutes);

app.use('/api/users',userRoutes);

//manejo de error
app.use((req,res,next) =>{
    const error =new HttpError('no se encontro rutasolicitada', 404);
    throw error;
})

//middleware para manejo de errores
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({errorMessage: error.message} || 'ha ocurrido un error inesperado');
});
app.listen(5000);
