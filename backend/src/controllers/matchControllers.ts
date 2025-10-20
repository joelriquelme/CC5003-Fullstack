import { Request, Response, NextFunction } from 'express';
import Match, { IMatch } from '../models/matchesModel'; 

export const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const matches: IMatch[] = await Match.find({})
            .populate('discipline', { name: 1 }) 
            .populate('teamA', { code: 1, name: 1 })
            .populate('teamB', { code: 1, name: 1 });
            
        res.json(matches); 
    } catch (error) { next(error); }
};


export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const match = await Match.findById(req.params.id)
            .populate('discipline', { name: 1 }) 
            .populate('teamA', { code: 1, name: 1 })
            .populate('teamB', { code: 1, name: 1 });
            
        if (match) {
            res.json(match);
        } else {
            res.status(404).end(); 
        }
    } catch (error) { next(error); }
};


export const getStandings = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const matches = await Match.find({})
      .populate("discipline", "name")  // { _id, name }
      .populate("teamA", "code name")  // { _id, code, name }
      .populate("teamB", "code name")  // { _id, code, name }
      .lean();

    type Key = string; // `${code}|${discipline}`
    const table = new Map<Key, { code:string; name:string; discipline:string; PJ:number; PG:number; PE:number; PP:number }>();

    const add = (code:string, name:string, discipline:string, pj:number, pg:number, pe:number, pp:number) => {
      const key = `${code}|${discipline}`;
      if (!table.has(key)) table.set(key, { code, name, discipline, PJ:0, PG:0, PE:0, PP:0 });
      const it = table.get(key)!;
      it.PJ += pj; it.PG += pg; it.PE += pe; it.PP += pp;
    };

    for (const m of matches) {
      const disc = (m as any).discipline?.name ?? "Desconocida";
      const A = (m as any).teamA, B = (m as any).teamB;
      const aCode = A?.code ?? "", aName = A?.name ?? "";
      const bCode = B?.code ?? "", bName = B?.name ?? "";

      // calcula resultado
      const aWin = Number(m.scoreA) > Number(m.scoreB);
      const draw = Number(m.scoreA) === Number(m.scoreB);
      const bWin = Number(m.scoreB) > Number(m.scoreA);

      add(aCode, aName, disc, 1, aWin ? 1 : 0, draw ? 1 : 0, bWin ? 1 : 0);
      add(bCode, bName, disc, 1, bWin ? 1 : 0, draw ? 1 : 0, aWin ? 1 : 0);
    }

    res.json(Array.from(table.values()));
  } catch (e) { next(e); }
};


export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { discipline, teamA, teamB, date, scoreA, scoreB } = req.body;

    if (!discipline || !teamA || !teamB || date === undefined || scoreA === undefined || scoreB === undefined) {
         res.status(400).json({ error: 'Faltan campos requeridos: discipline, teamA, teamB, date, scoreA, scoreB' });
         return;
    }

    try {
        const nuevoMatch = new Match({ discipline, teamA, teamB, date, scoreA, scoreB });
        const savedMatch = await nuevoMatch.save();
        res.status(201).json(savedMatch);
    } catch (error) { next(error); } 
};


export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, icon, days } = req.body;

    try {
        const updatedMatch = await Match.findByIdAndUpdate(
            req.params.id, 
            { name, icon, days }, 
            { new: true, runValidators: true }
        );

        if (updatedMatch) {
            res.json(updatedMatch);
        } else {
            res.status(404).end(); 
        }
    } catch (error) { next(error); }
};


export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Match.findByIdAndDelete(req.params.id);
        res.status(204).end(); 
    } catch (error) { next(error); }
};