import { Request, Response, NextFunction } from 'express';
import Discipline, { IDiscipline } from '../models/disciplinesModel';
 
export const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const disciplinas: IDiscipline[] = await Discipline.find({});
        res.json(disciplinas); 
    } catch (error) { next(error); }
};


export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const disciplina = await Discipline.findById(req.params.id);
        if (disciplina) {
            res.json(disciplina);
        } else {
            res.status(404).end(); 
        }
    } catch (error) { next(error); }
};


export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, icon, days } = req.body;

    try {
        const nuevaDisciplina = new Discipline({ name, icon, days });
        const savedDisciplina = await nuevaDisciplina.save();
        res.status(201).json(savedDisciplina);
    } catch (error) { next(error); } 
};


export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, icon, days } = req.body;

    try {
        const updatedDisciplina = await Discipline.findByIdAndUpdate(
            req.params.id, 
            { name, icon, days }, 
            { new: true, runValidators: true }
        );

        if (updatedDisciplina) {
            res.json(updatedDisciplina);
        } else {
            res.status(404).end(); 
        }
    } catch (error) { next(error); }
};

 
export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Discipline.findByIdAndDelete(req.params.id);
        res.status(204).end(); 
    } catch (error) { next(error); }
};