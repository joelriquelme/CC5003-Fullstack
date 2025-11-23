import mongoose from 'mongoose';

type DisciplineIcon = "Fútbol" | "Tenis" | "Básquetbol" | "Natación" | "Taca-Taca";

export interface IDiscipline {
    id: string;
    name: string;
    icon: DisciplineIcon;
    days: string[];
}

const disciplineSchema = new mongoose.Schema<IDiscipline>({
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    days: [{ type: String }]
});

const Discipline = mongoose.model('Discipline', disciplineSchema);

disciplineSchema.set("toJSON", {
  transform: (document, returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }) => {
    returnedObject.id = returnedObject._id?.toString(); 
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default Discipline;