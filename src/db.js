import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yancheo:ipchile1234@eventos-en-la-nube.vq0wezo.mongodb.net/eventosdb?retryWrites=true&w=majority&appName=Eventos-en-la-nube')
    console.log(">>> DB is connected.");
  } catch (error) {
    console.log(error);
  }
}