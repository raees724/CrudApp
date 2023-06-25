import User from '../model/user.js';


export const getUsers = async (request, response) => {
    try{
        const users = await User.find();
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}


export const addUser = async (request, response) => {
    const user = request.body;
  
    try {
      const existingUser = await User.findOne({
        $or: [{ email: user.email }, { phone: user.phone }]
      });
  
      if (existingUser) {
        return response.status(409).json({ message: 'Email or phone number already exists.' });
      }
  
      const newUser = new User(user);
      await newUser.save();
      response.status(201).json(newUser);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }


export const getUserById = async (request, response) => {
    try{
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editUser = async (request, response) => {
    try {
      const { id } = request.params;
      const updatedUser = request.body;
  

      const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      response.status(200).json(user);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }



export const deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}