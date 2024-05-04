import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Grid, Box, Typography, Pagination as MuiPagination, PaginationProps, PaginationItem, TextField } from '@mui/material';
import Button from '../Button/CustomButton';

const CustomPagination = styled(MuiPagination)({
  '& .MuiButtonBase-root': {
    border: '1px solid var(--wbl-font-yellow)',
    color: 'var(--wbl-font-yellow)',
    borderRadius: '7px',
    fontSize: '14px',
    width: 45, 
    height: 45,
  },
  '& .MuiButtonBase-root.Mui-disabled': {
    border: '1px solid var(--wbl-outline-grey)',
    color: '#C6C6CA',
    backgroundColor: 'transparent',
    opacity: '1',
  },
  '& .Mui-selected': {
    border: 'none',
    width: 45, 
    height: 45,
    background: 'var(--wbl-outline-grey)',
    color: 'var(--wbl-font-yellow)'
  },
  '& li:last-child': {
    border: 'none',
    color: '#C6C6CA',
    '& button': {
      width: 108,
      height: 45
    },
    '& svg': {
      visibility: 'hidden'
    },
    '& button:before': {
      content: '"Next"',
      verticalAlign: 'sub',
      marginLeft: '5px'
    }
  },
  '& li:first-of-type': {
    border: 'none',
    color: '#C6C6CA',
    '& button': {
      width: 108,
      height: 45,
      // cursor: 'pointer'
    },
    '& svg': {
      visibility: 'hidden'
    },
    '& button:before': {
      content: '"Previous"',
      verticalAlign: 'sub',
      marginLeft: '5px'
    }
  }

})

const MobilePagination = styled(MuiPagination)({
  '& .MuiButtonBase-root': {
    border: '1px solid var(--wbl-font-yellow)',
    color: 'var(--wbl-font-yellow)',
  },
  '& .MuiButtonBase-root.Mui-disabled': {
    border: '1px solid var(--wbl-outline-grey)',
    color: '#C6C6CA',
    backgroundColor: 'transparent',
    opacity: '1',
  },
  '& .Mui-selected': {
    border: 'none',
    background: 'var(--wbl-outline-grey)',
    color: 'var(--wbl-font-yellow)',
    // height: 45,
    // width: 40
  },
  '& li:last-child': {
    border: 'none',
    color: '#C6C6CA',
    '& button': {
      // width: 75,
      // height: 45
    },
    // '& button:before': {
    //   content: '"Next"',
    //   verticalAlign: 'sub',
    //   marginLeft: '5px'
    // },
    '& svg': {
      // visibility: 'hidden'
    },

  },
  '& li:first-of-type': {
    border: 'none',
    color: '#C6C6CA',
    '& button': {
      // width: 75,
      // height: 45
    },
    // '& button:before': {
    //   content: '"Previous"',
    //   verticalAlign: 'sub',
    //   marginLeft: '5px'
    // },
    '& svg': {
      // visibility: 'hidden'
    },
  }
  // '& li:last-child': {
  //   border: 'none',
  //   color: '#C6C6CA',
  //   '& button': {
  //   },

  // },
  // '& li:first-of-type': {
  //   border: 'none',
  //   color: '#C6C6CA',
  //   '& button': {
  //   },
  // }

})

const PageSelector = styled(TextField)({
  '&': {
    marginRight: '20px',
  },
  '& .MuiOutlinedInput-root': {
    width: 45,
    height: 45,
    background: 'linear-gradient(0deg, rgba(121, 121, 121, 0.3), rgba(121, 121, 121, 0.3))',
    '& fieldset': {
      border: '1px solid var(--wbl-outline-blue1)',
      borderRadius: '5px',
      color: 'var(--apex-font-light)'
    },
    '& input': {
      // padding: '8px 5px',
      textAlign: 'center'
    },
  }
})

const MobilePageSelector = styled(TextField)({
  '&': {
    marginRight: '10px',
  },
  '& .MuiOutlinedInput-root': {
    width: 35,
    height: 35,
    background: 'linear-gradient(0deg, rgba(121, 121, 121, 0.3), rgba(121, 121, 121, 0.3))',
    '& fieldset': {
      border: '1px solid var(--wbl-outline-blue1)',
      borderRadius: '5px',
      color: 'var(--apex-font-light)'
    },
    '& input': {
      padding: '8px 5px',
      textAlign: 'center',
    },
  }
})

interface CustomPaginationProps extends PaginationProps {
  handleViewChange: (rowPerPage: number) => void
  type?: string
  length?: number
}

const Pagination: React.FC<CustomPaginationProps> = (props) => {
  const { handleViewChange, type, length, sx, ...rest } = props
  const [rowPerPage, setRowPerPage] = useState<any>(5)
  const [imageHeight, setImageHeight] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => setImageHeight(window.innerWidth));
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value

    let regex = /^\d*$/
    if (regex.test(value)) {
      setRowPerPage(value)
    } else {
      return
    }

  }

  return (
    <Grid container spacing={2} justifyContent={'space-between'} sx={{ ...sx }}>
      <Grid
        item
        xs={12}
        md={2}
        sm={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--wbl-font-secondary)',
        }}
      >
        <Box sx={{fontSize: '14px'}}>
        Count: {length}
        </Box>
        {
          imageHeight < 768 && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography className='bodyMediumText' sx={{ mr: 1, width: 110, fontSize: '14px' }}>Rows Per Page:</Typography>
              <MobilePageSelector size="small" value={rowPerPage} onChange={handleChange} />
              <Button
                className=''
                size="small"
                sx={{ width: { xs: 45, md: 75, color: 'var(--wbl-font-yellow)',
                border: '1px solid var(--wbl-font-yellow)',
                height: 35 }}}
                onClick={() => handleViewChange(+rowPerPage)}
              >
                View
              </Button>
            </Box>
          )
        }
      </Grid>
      <Grid
        item xs={12} md={10} sm={10}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'end'
        }}
      >
        {
          imageHeight >= 768 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { sm: 2, md: 0 } }}>
              <Typography className='bodyMediumText' sx={{ mr: 1, width: 110, color: 'var(--wbl-font-secondary)', fontSize: '14px' }}>Rows Per Page:</Typography>
              <PageSelector size="small" value={rowPerPage} onChange={handleChange} />
              <Button className='btnSecondary' size="small" sx={{ height: 45 , width: { xs: 108, md: 108, color:'var(--wbl-font-yellow)', border: '1px solid var(--wbl-font-yellow)' }, marginRight: 2 }} onClick={() => handleViewChange(+rowPerPage)}>View</Button>
            </Box>
          )
        }
        <Box sx={{ display: { xs: 'flex', sm: 'block' }, justifyContent: { xs: 'center', sm: 'normal' } }}>
          {
            imageHeight < 768 ? (
              <MobilePagination {...rest} />
            ) : (
              <CustomPagination {...rest} />
            )
          }
        </Box>
      </Grid>
    </Grid>

  )
}

export default Pagination