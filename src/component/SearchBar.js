// SearchBar.js
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper } from '@mui/material';

// SearchBar.js
// ... other imports ...

class SearchBar extends React.Component {
  state = {
    searchQuery: '',
  };

  onChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.searchQuery); // Lift up the state
  };

  render() {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        onSubmit={this.onSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search what you want"
          inputProps={{ 'aria-label': 'search what you want' }}
          value={this.state.searchQuery}
          onChange={this.onChange}
        />
        <SearchIcon sx={{ p: '10px' }} />
      </Paper>
    );
  }
}

export default SearchBar;

