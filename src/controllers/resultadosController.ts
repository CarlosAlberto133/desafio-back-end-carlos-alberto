import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createConnection } from "../database/Connection"
import { ResultadoModel } from '../models/resultadoModel'

export const adicionarResultado = (req: Request, res: Response) => {
  const { bimestre, disciplina, nota } = req.body

  if (!bimestre || !disciplina || !nota) {
    return res.status(400).json({ error: 'Dados incompletos' })
  }

  if (nota < 0 || nota > 10) {
    return res.status(400).json({ error: 'A nota deve estar entre 0 e 10' })
  }

  const connection = createConnection()

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }

    const verificaExistenciaQuery = 'SELECT * FROM Resultado WHERE bimestre = ? AND disciplina = ?'
    const verificaExistenciaValues = [bimestre, disciplina]

    connection.query(verificaExistenciaQuery, verificaExistenciaValues, (verificaExistenciaErr, results) => {
      if (verificaExistenciaErr) {
        console.error('Erro na verificação de existência:', verificaExistenciaErr)
        connection.end()
        return res.status(500).json({ error: 'Erro interno do servidor', errorMessage: verificaExistenciaErr.message })
      }

      if (results.length > 0) {
        connection.end()
        return res.status(400).json({ error: 'Já existe uma disciplina cadastrada para este bimestre' })
      }

      const id = uuidv4()
      const criadoEm = new Date()
      const atualizadoEm = new Date()

      const novoResultado: ResultadoModel = {
        id,
        bimestre,
        disciplina,
        nota,
        criadoEm,
        atualizadoEm,
      }

      const inserirResultadoQuery = 'INSERT INTO Resultado SET ?'

      connection.query(inserirResultadoQuery, novoResultado, (inserirResultadoErr) => {
        connection.end();

        if (inserirResultadoErr) {
          console.error('Erro na consulta SQL:', inserirResultadoErr)
          return res.status(500).json({ error: 'Erro interno do servidor' })
        }

        res.status(201).json({ message: 'Resultado adicionado com sucesso', id })
      })
    })
  })
}

export const listarResultados = async (req: Request, res: Response) => {
  const { bimestre } = req.params

  try {
    const connection = createConnection()

    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao MySQL:', err)
        return res.status(500).json({ error: 'Erro interno do servidor' })
      }

      const query = 'SELECT * FROM Resultado WHERE bimestre = ? ORDER BY FIELD(disciplina, "Biologia", "Artes", "Geografia", "Sociologia")'

      connection.query(query, [bimestre], (queryErr, results) => {
        connection.end()

        if (queryErr) {
          console.error('Erro na consulta SQL:', queryErr)
          return res.status(500).json({ error: 'Erro interno do servidor' })
        }

        res.status(200).json(results)
      })
    })
  } catch (error) {
    console.error('Erro geral:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const deletarResultado = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const connection = createConnection()

    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao MySQL:', err)
        return res.status(500).json({ error: 'Erro interno do servidor' })
      }

      const query = 'DELETE FROM Resultado WHERE id = ?'

      connection.query(query, [id], (queryErr, results) => {
        connection.end()

        if (queryErr) {
          console.error('Erro na consulta SQL:', queryErr)
          return res.status(500).json({ error: 'Erro interno do servidor' })
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Resultado não encontrado' })
        }

        res.status(200).json({ message: 'Resultado deletado com sucesso' })
      })
    })
  } catch (error) {
    console.error('Erro geral:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}