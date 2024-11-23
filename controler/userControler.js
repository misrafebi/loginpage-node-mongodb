const userSchema = require('../model/userModel')

const registerUser = async (req,res)=>{
    try{
        const {username, password} = req.body
        
        const user = await userSchema.findOne({username})
        if(user) return res.render('user/register',{errorMessage:'User already exists'})

        const newUser = new userSchema({
            username, password
        })

        await newUser.save()
        res.render('user/login',{successMessage:'User Created Successfully'})
    }catch(error){
        console.error('Error during registration:', error);
        res.status(500).render('user/register', { errorMessage: 'Internal Server Error' });
    }
}

const login = async (req,res)=>{
    try{
        const {username, password} = req.body;

        
        const user = await userSchema.findOne({username})

        if(!user) return res.render('user/login',{ errorMessage: 'User does not exist'})
        
        if(user.password != password) return res.render('user/login',{errorMessage:'Incorrect Password'})
        
        req.session.user = true

        res.render('user/home',{successMessage:'Login Successful'})
    }catch(error){
        console.error('Error during registration:', error);
        res.status(500).render('user/login', { errorMessage: 'Internal Server Error' });
    }
}
 
const loadLogin = (req,res) =>{
    res.render('user/login')
}

const loadRegister = (req,res) =>{
    res.render('user/register')

    
}


const loadHome = (req,res) => {
    res.render('user/home')
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/user/home'); 
        }
        res.redirect('/user/login'); 
    });
};

module.exports = {registerUser, loadLogin, loadRegister, login, loadHome, logout}

