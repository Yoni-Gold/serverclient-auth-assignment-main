import { Schema , model } from 'mongoose'

interface User {
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  city: string,
  country: string,
  postalCode: string,
  aboutMe: string
} 

const userSchema : Schema = new Schema<User>({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  aboutMe: { type: String, required: false }
});
 
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
 
export default model<User>('User', userSchema);