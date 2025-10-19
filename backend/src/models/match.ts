import mongoose, { Types } from 'mongoose';

export interface IMatch {
    discipline: mongoose.Types.ObjectId;  
    teamA: mongoose.Types.ObjectId;      
    teamB: mongoose.Types.ObjectId;
    date: Date;
    scoreA: number;
    scoreB: number;
}

const matchSchema = new mongoose.Schema<IMatch>({
    discipline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discipline', 
        required: true
    },
    teamA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    teamB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    date: { type: Date, required: true },
    scoreA: { type: Number, required: true, default: 0 },
    scoreB: { type: Number, required: true, default: 0 },
});

const Match = mongoose.model('Match', matchSchema);

export default Match;