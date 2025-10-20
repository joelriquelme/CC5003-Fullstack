import { Request, Response, NextFunction } from 'express';
import Department from '../models/departmentsModel';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await Department.find({}, {
      code: 1, name: 1, gold: 1, silver: 1, bronze: 1, points: 1
    }).lean();

    res.json(rows.map(r => ({
      id: r._id.toString(),
      code: r.code,
      name: r.name,
      gold: Number(r.gold ?? 0),
      silver: Number(r.silver ?? 0),
      bronze: Number(r.bronze ?? 0),
      points: Number(r.points ?? 0),
    })));
  } catch (e) { next(e); }
};


export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const departamento = await Department.findById(req.params.id);
        if (departamento) {
            res.json(departamento);
        } else {
            res.status(404).end(); 
        }
    } catch (error) { next(error); }
};


export const getMedalTable = async (_req: Request, res: Response) => {
  const rows = await Department.find({}, {
    code: 1, name: 1, gold: 1, silver: 1, bronze: 1, points: 1
  }).lean();

  res.json(rows.map(r => ({
    id: r._id.toString(),
    code: r.code,
    name: r.name,
    gold: r.gold,
    silver: r.silver,
    bronze: r.bronze,
    points: r.points
  })));
};


export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { code, name } = req.body; 

    if (!code || !name) {
         res.status(400).json({ error: 'Faltan campos requeridos: code y name' });
         return;
    }

    try {
        const nuevoDepartamento = new Department({ code, name });
        const savedDepartamento = await nuevoDepartamento.save();
        res.status(201).json(savedDepartamento);
    } catch (error) { next(error); } 
};


export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { code, name } = req.body; 

    try {
        const updatedDepartamento = await Department.findByIdAndUpdate(
            req.params.id, 
            { code, name }, 
            { new: true, runValidators: true }
        );

        if (updatedDepartamento) {
            res.json(updatedDepartamento);
        } else {
            res.status(404).end(); 
        }
    } catch (error) { next(error); }
};


export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.status(204).end(); 
    } catch (error) { next(error); }
};