import mongoose from 'mongoose';

type DisciplineIcon = "Fútbol" | "Tenis" | "Básquetbol" | "Natación" | "Taca-Taca";

export interface IDiscipline {
    name: string;
    icon: DisciplineIcon;
}

const disciplineSchema = new mongoose.Schema<IDiscipline>({
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
});

const Discipline = mongoose.model('Discipline', disciplineSchema);

export default Discipline;