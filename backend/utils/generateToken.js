import jwt from "jsonwebtoken";

const generateToken = (id) => {
  // console.log('Generating token for ID:', id);
  // console.log('Using JWT_SECRET:', process.env.JWT_SECRET); 
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

};

export { generateToken };
