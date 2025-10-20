import mongoose from 'mongoose';

export interface IDepartment {
    id: string;
    code: string; 
    name: string; 
    gold: number;
    silver: number;
    bronze: number;
    points: number;
}

const departmentSchema = new mongoose.Schema<IDepartment>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    gold:   { type: Number, default: 0 },
    silver: { type: Number, default: 0 },
    bronze: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
});

departmentSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;