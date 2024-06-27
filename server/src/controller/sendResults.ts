import e, { Request, Response } from 'express'
import { sendResultsTestsToDB } from '../model/sendResultTestsToDB'

const sendResults = async (req: Request, res: Response) => {

   console.log('função chamada')

   const { registration, name, result } = req.body

   console.log({ registration, name, result })

   const date = new Date().toLocaleDateString('pt-br')

   try {
      const response = await sendResultsTestsToDB(registration, name, date, result)
      res.status(200).json(response)
      console.log(response)
   } catch (error) {
      console.log('Erro ao salvar no banco - Controller')
      console.log(error)
      res.status(400).json(error)
   }
}

const sendResultsRouter = e.Router()

sendResultsRouter.post('/', sendResults)

export { sendResultsRouter }