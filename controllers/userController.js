const User = require('../models/userModel');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './photo')
    },
    filename: function (req, file, cb) {
      cb(null,  + Date.now() + file.originalname )
    }
  })
const upload = multer({ storage: storage });

  const  getAllUsers= async(req, res)=> {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const getOneUser= async(req,res)=>{
    try{
        const userId = req.params.id
        console.log("userID",userId);
        const user = await User.getOneUser(userId)
        console.log("user->>",user);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
          }
        res.json(user)

    }catch(error){
        res.status(500).json({error:error.message})
    }

  }

  const addUser= async(req, res)=> {
    try {
        const { name, radio } = req.body;
        if (!['male', 'female'].includes(radio)) {
            throw new Error('Invalid radio option');
        }
        const existingUser = await User.getUserByName(name);
    if (existingUser) {
        throw new Error('User with the same name already exists');
    }
    const filename = req.file ? req.file.filename : null; 
    const userData = { name, radio, image_filename: filename }; 
        const userId = await User.addUser(userData);
        console.log("userData",userId);
        
      res.json({ message: 'User added successfully!', id: userId,name });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  module.exports = {upload, getAllUsers, addUser,getOneUser }