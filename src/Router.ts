import express from 'express'
import { adicionarResultado, listarResultados, deletarResultado } from './controllers/resultadosController'

const resultadosRouter = express.Router()

resultadosRouter.post('/', adicionarResultado)
resultadosRouter.get('/:bimestre', listarResultados)
resultadosRouter.delete('/:id', deletarResultado)

export default resultadosRouter