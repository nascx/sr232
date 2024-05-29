import {Request, Response} from 'express'
import { searchForCollaboratorByRegistration } from '../model/getCollaborator'

export const getCollaboratorName = async (req : Request, res: Response ) => {

    const { id } = req.query

    console.log(id)

    try {
        const responseFromDatabase = await searchForCollaboratorByRegistration(id);
        res.status(200).json(responseFromDatabase);
    } catch (err) {
        console.error('Error:', err); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving collaborator', details: err });
    }

}

