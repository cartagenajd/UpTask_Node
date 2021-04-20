const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');

//local Strategy - Login con credenciales propias en BD
passport.use(
    new LocalStrategy(
        //por default passport espera un usuario y password
        {
            //reasignamos los calores con los del modelo
            usernameField: 'email', //debe ser el mismo nombre que en el modelo
            passwordField: 'password' //debe ser el mismo nombre que en el modelo
        },
        async (email, password, done) => {
            //consultamos a la BD los datos ingresados por el usuario
            try {
                const usuario = await Usuarios.findOne({
                    where: { email: email }
                });


                //el usuario existe pero ahora validamos el password
                
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'El password incorrecto'
                    });
                }
                else{
                    console.log('EL usario existe');
                    //los datos con correctos
                    return done(null, usuario);
                }

            } catch (error) {

                //el usuario no existe
                return done(null, false, {
                    message: 'La cuenta no existe'
                });
                
            }      
        }
    )
)



//serializar el usuario

passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//deserializar el objeto
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;
