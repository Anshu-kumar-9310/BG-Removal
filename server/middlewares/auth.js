import jwt from 'jsonwebtoken'
// middleware function to decode jwt token to get clerkId
const authUser = async (req, res, next) => {
  try{
    const {token} = req.headers

    // if token is not avialable
    if(!token) {
      return res.json({success:false, message:"User Not Authorized! Login Agian."})
    }

    // if token is present
    const token_decode = jwt.decode(token)
    // adding userId variable to req.body in which value is clerkId
    req.body.userId = token_decode.clerkId
    // calling next 
    next()
    
  }catch (error){
    // console.log(error.message)
    res.json({success:false, message:error.message})
  }
}

export default authUser