import jwt from 'jsonwebtoken'
import User from '../models/user'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'


// Register new teacher 
export const register = async (req,res) => {
   try {
      const {name,email,password} = req.body // recojemos cuerpo de la petición
       const user = await User.create({ // creamos un objeto de la collección que queramos (Solo el modelo igual a un insert)
         name,
         email,
         password: bcrypt.hashSync(password,10) // Cifrar pass con bcrypt (libreria)
      })
      res.status(201).json({ // Envío un mensaje con status 201 para indicar que se ha creado.
          message:'Register successfully!!',
          "user": user
      })
   } catch (error) { // Capturamos errores 
      res.status(500).json({
         error: error.message
      })
   }

}


// Login Teacher
export const login = async (req,res) => { // recibirá la req y res 
    try {
        const {email,password} = req.body
        const teacher = await Teacher.findOne({
          where: {
              email // Buscamos por email
          }
        })
        if(!teacher){
          return res.status(400).json({
              message:'Email or password incorrect'
          })
        }
        const validPassword = bcrypt.compareSync( // Comparamos la contraseña que nos llega con la que tenemos en la base de datos
          password,
          teacher.password)
        if(!validPassword){
          return res.status(400).json({
              message:'Email or password incorrect'
          })
        }
        const token = jwt.sign({
          id:teacher.id
        },process.env.SECRET_KEY,{ // Ciframos el id del usuario con el secret key
          expiresIn: 60 * 60 * 24
        })
        res.status(200).json({
          message:'Login successfully',
          token,
          "teacher": teacher

        })
    } catch (error) {
        res.status(500).json({
          error: error.message
        })
    }
  }

