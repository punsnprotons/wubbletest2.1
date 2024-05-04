import { useEffect, useState, useCallback } from 'react'
import { Box, CardMedia, IconButton, Typography, LinearProgress, InputLabel, Grid, Card } from '@mui/material'
import CustomButton from '../../components/base/Button/CustomButton'
import { CustomTextFieldSecondary } from '../../components/base/TextField/CustomTextField'
import styles from './Artist.module.css'
import { getCurrentDimension, debounce, validateEmail, validatePassword, validateMatchPassword } from '../../constants'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import NextStepDialog from '../../components/NextStepDialog/NextStepDialog'
import MobileMenu from '../../components/MobileMenu/MobileMenu'

const artists = [
  {
    id: 1,
    src: 'elvis.png',
    name: 'AI Elvis Model'
  },
  {
    id: 2,
    src: 'mj.png',
    name: 'AI Michael Model'
  },
  {
    id: 3,
    src: 'frank.png',
    name: 'AI Frank Model'
  },
  {
    id: 4,
    src: 'freddie.png',
    name: 'AI Freddie Model'
  },
  {
    id: 5,
    src: 'patrick.png',
    name: 'AI Patrick Model'
  },
  {
    id: 6,
    src: 'whitney.png',
    name: 'AI Whitney Model'
  },
  {
    id: 7,
    src: 'taylor.png',
    name: 'AI Taylor Model'
  },
  {
    id: 8,
    src: 'kanye.png',
    name: 'AI Kanye Model'
  },
  {
    id: 9,
    src: 'squidward.png',
    name: 'AI Squidward Model'
  },
  {
    id: 10,
    src: 'paul.png',
    name: 'AI Paul Model'
  },
  {
    id: 11,
    src: 'homer.png',
    name: 'AI Homer Model'
  },
  {
    id: 12,
    src: 'drizzy.png',
    name: 'AI Drizzy Model'
  },
  {
    id: 13,
    src: 'lana.png',
    name: 'AI Lana Model'
  },
  {
    id: 14,
    src: 'weeknd.png',
    name: 'AI Weeknd Model'
  },
  {
    id: 15,
    src: 'spongebob.png',
    name: 'AI Spongebob Model'
  }
]

const Artist = () => {
  const navigate = useNavigate()

  // const [artists, setArtists] = useState()

  // const [search, setSearch] = useState('')
  const [artistQuery, setArtistQuery] = useState<any[]>(artists)
  const handleSearch = (e: any): void => {
    setArtistQuery(artists.filter((artist: any) => artist.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  const [openNextStepDialog, setOpenNextStepDialog] = useState<boolean>(false)
  const handleOpenCloseDialog = (): void => {
    setOpenNextStepDialog(!openNextStepDialog)
  }

  // will update this function later
  const selectArtist = () => {
    return {
      tempMessage: 'OK'
    }
  }

  return (
    <>
      <NextStepDialog
        openNextStepDialog={openNextStepDialog}
        openOrCloseDialog={handleOpenCloseDialog}
        afterNextStep={selectArtist}
        currentPath='/artist-selection'
      />
      <Box className={`${styles.artistPage} bg-2`}>
        <Box className={styles.artistContainer}>
          {
            screenSize.width <= 768 &&
            // <MobileMenu />
            <></>
          }
          {/* <Box className={styles.backBtn} sx={{  }}>
            <ArrowBackIosNewIcon onClick={() => navigate(-1)} sx={{ fontSize: {xs: '16px', md: '12px'} }}/>
            <Typography sx={{fontSize: {xs: '16px', md: '12px'}}}>Music Trainer</Typography>
          </Box> */}
          <Box className={styles.flexBetween} sx={{ marginTop: '25px' }}>
            <Typography
              color={'var(--wbl-font-primary)'} fontSize={'20px'}
            >
              Artist Selection
              <span
                style={{
                  color: 'var(--wbl-font-secondary)'
                }}
              >
                {" (Coming Soon)"}
              </span>
            </Typography>
            <Typography color={'var(--wbl-font-secondary)'} sx={{ textDecoration: 'underline', cursor: 'pointer' }} fontSize={'16px'} onClick={() => navigate('/lyric-creation')}>Skip</Typography>
          </Box>
          <Box className={styles.flexBetween} sx={{ marginTop: '20px' }}>
            <CustomTextFieldSecondary
              className={styles.searchInput}
              id='search'
              name='search'
              type='text'
              placeholder='Search'
              // value={'a'}
              onChange={(e) => handleSearch(e)}
              sx={{ width: '100%', }}
              InputProps={{
                endAdornment: (
                  <IconButton className={styles.iconBtn} aria-label='' onClick={e => handleSearch(e)}>
                    <SearchIcon />
                  </IconButton>
                )
              }}
            />
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
              {
                artistQuery.map((artist) => {
                  return (
                    <Grid item xs={6} md={4} key={artist.id}>
                      <Card sx={{ padding: 1 }} className={styles.card}>
                        <CardMedia
                          component='img'
                          image={require(`../../assets/artists/${artist.src}`)}
                          alt='artist'
                          onClick={() => handleOpenCloseDialog()}
                        />
                        <Typography sx={{ fontSize: '16px', marginTop: '5px' }}>{artist.name}</Typography>
                      </Card>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Box>
        </Box>
      </Box>

    </>
  )
}

export default Artist