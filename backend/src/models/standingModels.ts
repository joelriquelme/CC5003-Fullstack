import mongoose from 'mongoose';
import { getStandings } from '../controllers/matchControllers';

export interface IStanding {
  code: string;
  name: string;
  discipline: string;
  PJ: number;
  PG: number;
  PE: number;
  PP: number;
}

const standingSchema = new mongoose.Schema<IStanding>({
  code: { type: String, required: true },
  name: { type: String, required: true },
  discipline: { type: String, required: true },
  PJ: { type: Number, default: 0 },
  PG: { type: Number, default: 0 },
  PE: { type: Number, default: 0 },
  PP: { type: Number, default: 0 }
});

standingSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});


const Standing = mongoose.model('Standing', standingSchema);

export default Standing;