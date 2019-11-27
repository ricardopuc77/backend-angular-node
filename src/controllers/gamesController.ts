import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

    public async list (req: Request, res: Response) {
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }
    
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id} = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);

        if(games.length > 0){
            return res.json(games[0]);
        }else{
            res.status(404).json({message:"No encontrado"});
        }
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games SET ?', [req.body]);
        res.json({message:"Guardado"});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message:"Eliminado " + req.params.id});
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
        res.json({message:"Actualizado " + req.params.id});
    }
}

const gamesController = new GamesController();
export default gamesController;