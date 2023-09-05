import {alpha, styled} from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import {ChangeEvent, SetStateAction, useState} from 'react';
import {Row} from '../db/model';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))

const Header = ({rows, setDisplayRows}:{ rows:Row[], setDisplayRows:any}) => {
    const [inputValue, setInputValue] = useState('');

    const search = () => {
        setDisplayRows(rows.slice().filter(row => row.name.toLowerCase().includes(inputValue.toLowerCase())
            || row.email.toLowerCase().includes(inputValue.toLowerCase())
        ));
    }

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (inputValue) {
            search();
        } else {
            setDisplayRows(rows);
        }
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        My Account
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>

                        <StyledInputBase placeholder="Search…" value={inputValue} onChange={handleInputChange} />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
