import express from "express"
import cors from 'cors'
import resultadosRouter from "./Router"

const app = express()
const port = 3333
app.use(cors())

app.use(express.json())

app.use('/resultados', resultadosRouter)

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`)
})