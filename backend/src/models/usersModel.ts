import mongoose from "mongoose";

interface UserData {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
}

const userSchema = new mongoose.Schema<UserData>({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform: (
    _document,
    returnedObject: {
      id?: string;
      _id?: mongoose.Types.ObjectId;
      __v?: number;
      passwordHash?: string;
    }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
export default mongoose.model("User", userSchema);
