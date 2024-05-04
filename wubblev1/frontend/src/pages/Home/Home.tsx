import { useState } from 'react'
import { Box, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import styles from './Home.module.css'

const arraySelect = [
  {
    id: 1,
    name: 'select1'
  },
  {
    id: 2,
    name: 'select2'
  },
]

const Home = () => {

  const [select, setSelect] = useState({
    id: 0,
    name: ''
  })

  const handleChange = (e: any): void => {
    const optionSelected = arraySelect.filter((option: any) => option.id === e.target.value)[0]
    setSelect(optionSelected)
  }

  return (
    <Box>
      <Typography>
        Home
      </Typography>
    </Box>
  )
}

export default Home