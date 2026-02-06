import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

export const StyledSearch = styled('div')(({ theme }) => {
  // Both themes use a colored header (dark or teal), so search is always light-on-dark
  const bg = alpha(theme.palette.common.white, 0.12)
  const border = alpha(theme.palette.common.white, 0.2)
  const hoverBg = alpha(theme.palette.common.white, 0.18)
  const hoverBorder = alpha(theme.palette.common.white, 0.35)
  const focusBorder = alpha(theme.palette.common.white, 0.5)
  return {
    position: 'relative',
    borderRadius: 10,
    backgroundColor: bg,
    border: `1px solid ${border}`,
    transition: theme.transitions.create(['background-color', 'border-color'], {
      duration: 150,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      backgroundColor: hoverBg,
      borderColor: hoverBorder,
    },
    '&:focus-within': {
      backgroundColor: hoverBg,
      borderColor: focusBorder,
    },
    marginLeft: 0,
    width: '100%',
    minHeight: 42,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
      minWidth: 200,
    },
  }
})

export const StyledSearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.25, 1, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width', {
      duration: 200,
      easing: theme.transitions.easing.easeInOut,
    }),
    width: '100%',
    '&::placeholder': {
      opacity: 0.7,
    },
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}))
