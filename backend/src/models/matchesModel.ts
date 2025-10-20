import mongoose from 'mongoose';

export interface IMatch {
    id: string;
    discipline: string
    teamA: mongoose.Types.ObjectId;      
    teamB: mongoose.Types.ObjectId;
    date: Date;
    scoreA: number;
    scoreB: number;
}

const matchSchema = new mongoose.Schema<IMatch>({
    discipline: { type: String, required: true },
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