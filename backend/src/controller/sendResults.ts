import e, { Request, Response } from 'express'
import { sendResultsTestsToDB } from '../model/sendResultTestsToDB'

const sendResults = (req: Request, res: Response) => {

   const { registration, name, result } = req.body

   const date = new Date().toLocaleDateString('pt-br')

   try {
      const response = sendResultsTestsToDB(registration, name, date, result)
      res.status(200).json(response)
   } catch (error) {
      console.log('Erro ao salvar no banco - Controller')
      res.status(400).json(error)
   }
}

const sendResultsRouter = e.Router()

sendResultsRouter.post('/', sendResults)

export { sendResultsRouter }