import { useEffect, useState, useCallback } from 'react'
import { Box, CardMedia, Typography, InputLabel, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material'
import CustomButton from '../../components/base/Button/CustomButton'
import { CustomTextFieldTertiary } from '../../components/base/TextField/CustomTextField'
import styles from './Waitlist.module.css'
import { getCurrentDimension, debounce, validateEmail } from '../../constants'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useGetCustomerQuery } from '../../api/customer/customerRest'
import Pagination from '../../components/base/Pagination/CustomPagination'

const Waitlist = () => {
  const navigate = useNavigate()
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const getCustomerList = useGetCustomerQuery(null)
  const [customerList, setCustomerList] = useState<any[]>([])
  const [temp, setTemp] = useState<any[]>([])
  const [isAscending, setIsAscending] = useState<boolean>(false)
  const [isEmailAscending, setIsEmailAscending] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  const filterSearch = () => {
    let arrSearch = (customerList.filter((customer: any) => {
      if(customer.email.toLowerCase().includes(search.toLowerCase())) {
        return customer
      }
    }))
    if(arrSearch.length < 1) {
      arrSearch = (temp.filter((customer: any) => {
        if(customer.email.toLowerCase().includes(search.toLowerCase())) {
          return customer
        }
      }))
      setCustomerList(arrSearch)
    } else {
      setCustomerList(arrSearch)
    }
  }

  const handleSearch = async (): Promise<void> => {
    if(search) {
      await getCustomerList.refetch()
      filterSearch()
    } else {
      await getCustomerList.refetch()
    }
  }

  useEffect(() => {
    if(!search) {
      getCustomerList.refetch()
    }
  }, [search])

  const sortByDate = (e: any) => {
    let array = [...customerList]

    if (!isAscending && customerList) {
      setCustomerList(array.sort((a, b) => (a.id) - (b.id)))
      setIsAscending(true)
    } else if( isAscending && customerList) {
      setCustomerList(array.sort((a, b) => (b.id) - (a.id)))
      setIsAscending(false)
    }
  }

  const sortByEmail = (e: any) => {
    // sort customerList by email
    let array = [...customerList]
    if(!isEmailAscending && customerList) {
      setCustomerList(array.sort((a, b) => a.email.localeCompare(b.email) ))
      setIsEmailAscending(true)
    } else if( isEmailAscending && customerList) {
      setCustomerList(array.sort((a, b) => -1 * a.email.localeCompare(b.email)))
      setIsEmailAscending(false)
    }
  }

  useEffect(() => {
    if (getCustomerList?.data) {
      setCustomerList(getCustomerList.data)
      setTemp(getCustomerList.data)
    }
  }, [getCustomerList])

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage - 1)
  }
  const handleChangeRowsPerPage = (rpp: number) => {
    setRowsPerPage(rpp);
    setPage(0);
  };

  const convertDate = (date: string): string => {
    const inputDate = new Date(date);
    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getUTCDate()).padStart(2, '0');
    
    return `${year}/${month}/${day}`;
  }

  return(
    <Box className={`${styles.waitlistPage} bg-2`}>
      <Box className={styles.waitlistContainer}>
        {
          screenSize.width < 768 ? (
            <Box className={styles.backBtn} sx={{  }}>
              <ArrowBackIosNewIcon fontSize='small' onClick={() => navigate(-1)}/>
              <Typography sx={{fontSize: {xs: '20px', md: '24px'}}}>Back</Typography>
            </Box>
          ) : null
        }
        <Typography color={'var(--wbl-font-primary)'} sx={{fontSize: {xs: '20px', md: '24px'}}}>Wait List Registration</Typography>
        <Box className={styles.searchContainer}>
          <CustomTextFieldTertiary
            className={styles.searchInput}
            id='search'
            name='search'
            size='small'
            type='text'
            placeholder='Search'
            // value={'a'}
            onChange={(e) => setSearch(e.target.value)}
            // sx={{background: 'red'}}
            variant='outlined'
            InputProps={{
              endAdornment: (
                <IconButton className={styles.iconBtn} aria-label='' onClick={e=>handleSearch()}>
                  <SearchIcon  
                    sx={{
                      fontSize: '20px',
                    }}
                  />
                </IconButton>
              )
            }}
          />
        </Box>
        <Box className={styles.tableContainer}>
        <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Box className={styles.tableHeadCell}>
                  <Typography>Email</Typography>
                  <UnfoldMoreOutlinedIcon fontSize='small' sx={{ cursor: 'pointer', alignSelf: 'center'}} onClick={sortByEmail}/>
                </Box>
              </TableCell>
              <TableCell>
                <Box className={styles.tableHeadCell}>
                  <Typography>Date Applied</Typography>
                  <UnfoldMoreOutlinedIcon fontSize='small' sx={{ cursor: 'pointer', alignSelf: 'center'}} onClick={sortByDate}/>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" >
                  <Typography noWrap className={styles.tableCell}>{row.email}</Typography>
                </TableCell>
                <TableCell>{convertDate(row.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
           sx={{ mt: 0 }}
           variant="outlined" shape="rounded"
           count={Math.floor(customerList.length / rowsPerPage + 1) }
           length={customerList.length}
           page={page + 1}
           onChange={handlePageChange}
           handleViewChange={handleChangeRowsPerPage}
        />

        </Box>
      </Box>
    </Box>
  )
}

export default Waitlist