import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import user from '../models/user.js'


// Register new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body // recojemos cuerpo de la petición
    const user = await user.create({ // creamos un objeto de la collección que queramos (Solo el modelo igual a un insert)
      name,
      email,
      password: bcrypt.hashSync(password, 8) // Cifrar pass con bcrypt (libreria)
    })
    res.status(201).json({ // Envío un mensaje con status 201 para indicar que se ha creado.
      message: 'Register successfully!!',
      "user": user
    })
  } catch (error) { // Capturamos errores 
    res.status(500).json({
      error: error.message
    })
  }

}


// Login user
export const login = async (req, res) => { // recibirá la req y res 
  try {
    const { email, password } = req.body
    const user = await user.findOne({
      where: {
        email // Buscamos por email
      }
    })
    if (!user) {
      return res.status(400).json({
        message: 'Email or password incorrect'
      })
    }
    const validPassword = bcrypt.compareSync( // Comparamos la contraseña que nos llega con la que tenemos en la base de datos
      password,
      user.password)
    if (!validPassword) {
      return res.status(400).json({
        message: 'Email or password incorrect'
      })
    }
    const token = jwt.sign({
      id: user.id
    }, process.env.SECRET_KEY, { // Ciframos el id del usuario con el secret key
      expiresIn: 60 * 60 * 24
    })
    res.status(200).json({
      message: 'Login successfully',
      token,
      "user": user

    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

