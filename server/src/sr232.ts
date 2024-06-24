import e from 'express'

import { config } from 'dotenv'

import cors from 'cors'

import { getCollaboratorName } from './controller/getCollaboratorName'
import { listenForData } from './controller/getDataFromMachine'
import { sendResultsRouter } from './controller/sendResults'

config()

const server =  e()

server.use(cors())

server.use(e.json())

const port = 25000

server.get('/get-collaborator-name', getCollaboratorName )

server.get('/waiting-test', listenForData)

server.use('/send-results', sendResultsRouter)

server.listen(port, () => {
    console.log(`Listen in ${port} port`)
})
