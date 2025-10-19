import mongoose from 'mongoose';

export interface IDepartment{
    id: string;
    code: string; 
    name: string; 
}

const departmentSchema = new mongoose.Schema<IDepartment>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;