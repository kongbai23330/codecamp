// SearchBar.js
import * as React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { InputBase, Paper } from '@mui/material'

const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search what you want"
        inputProps={{ 'aria-label': 'search what you want' }}
      />
      <SearchIcon sx={{ p: '10px' }} />
    </Paper>
  )
}

export default SearchBar
