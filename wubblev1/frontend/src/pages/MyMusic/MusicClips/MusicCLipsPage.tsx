import React, { useEffect, useState } from 'react'
import { Box, InputAdornment, Typography } from '@mui/material'
import styles from './MusicClipsPage.module.css'
import { CustomTextFieldTertiary } from '../../../components/base/TextField/CustomTextField'
import SearchIcon from '@mui/icons-material/Search';
import { CustomSelectSecondary } from '../../../components/base/Select/CustomSelect';
import { getCurrentDimension } from '../../../constants/index'
import MusicNoteIcon2 from '../../../components/icons/MusicNoteIcon2'
import EditIcon from '../../../components/icons/EditIcon';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const dummyClips = [
  {
    title: 'ABC song',
    artist: 'The One and Only Ken',
    duration: '25',
    createdAt: '2023-08-28 04:10:02'
  },
  {
    title: 'Sample-clip-03',
    artist: 'New Artist',
    duration: '28',
    createdAt: '2023-08-28 04:12:01'
  }, {
    title: 'Sample-clip-02',
    artist: 'Anand',
    duration: '26',
    createdAt: '2023-08-28 04:10:01'
  }, {
    title: 'Sample-clip-01',
    artist: 'New Artist',
    duration: '30',
    createdAt: '2023-08-28 04:09:01'
  }
]

const sortOptions = [
  {
      id: 1,
      name: 'Date created'
  },
  {
      id: 2,
      name: 'Title'
  },
]

const MusicCLipsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortSelected, setSortSelected] = useState({
    id: 1, name: 'Date created'
  })

  const [whichClipHovered, setWhichClipHovered] = useState<number>(999)

  const [clips, setClips] = useState(dummyClips)

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

  useEffect(() => {
    setClips(dummyClips.filter(clip => {
      return clip.title.toLowerCase().includes(searchQuery.toLowerCase()) || clip.artist.toLowerCase().includes(searchQuery.toLowerCase())
    }))
  }, [searchQuery])

  const handleInputSearch = (e: any): void => {
    const value = e.target.value

    if (value.length < 31) {
        setSearchQuery(value)
    }
  }

  useEffect(() => {
    if (sortSelected.id === 1) {
        setClips(dummyClips.sort((a: any, b: any): any => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }))
    } else if (sortSelected.id === 2) {
        setClips(dummyClips.sort((a: any, b: any): any => {
          return a.title.localeCompare(b.title)
        }))
    }
  }, [sortSelected])

  const handleSelectChange = (e: any) => {
    const selected = sortOptions.filter(opt => opt.id === e.target.value)[0]
    setSortSelected(selected)
  }

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.queryContainer}>
        <CustomTextFieldTertiary
          variant='outlined'
          size="small"
          value={searchQuery}
          id="search"
          name="search"
          placeholder='Search'
          onChange={(e) => handleInputSearch(e)}
          className={styles.input}
          InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                sx={{
                  fontSize: '20px',
                }}
              />
            </InputAdornment>
          )
          }}
        />
        <CustomSelectSecondary
          selected={sortSelected}
          value={sortSelected.id}
          placeholder='Sort by: Date created'
          styles={{
              
          }}
          className={styles.input}
          selectlabel='Sort by: Date created'
          options={sortOptions}
          onChange={(e) => handleSelectChange(e)}
        />
      </Box>
      <Box className={styles.itemsContainer}>
        {
          clips.map((clip: any, idx: number) => {
            return (
              <Box 
                key={idx}
                onMouseEnter={() => setWhichClipHovered(idx)}
                onMouseLeave={() => setWhichClipHovered(999)}
                className={
                  whichClipHovered === idx ?
                    `${styles.hoveredClip} ${styles.clip}`
                    :
                    `${styles.clip}`
                }
              >
                <Box className={styles.clipDetailsContainer}>
                  <Box className={styles.clipDetails}>
                    <MusicNoteIcon2 sx={{ fontSize: '16px', alignSelf: 'center' }} />
                    <Typography sx={{ fontSize: '16px' }}>{clip.title}</Typography>
                  </Box>
                  <Box className={styles.clipDetails}>
                    <Typography sx={{ fontSize: '14px', marginLeft: '21px' }}>{clip.artist}</Typography>
                  </Box>
                </Box>
                <Box className={styles.utilityContainer}>
                  <Typography sx={{ fontSize: '16px', alignSelf: 'center' }} >0:{clip.duration}</Typography>
                  <MoreHorizIcon sx={{ fontSize: '26px', alignSelf: 'center', cursor: 'pointer' }} />
                  <EditIcon sx={{ fontSize: '16px', alignSelf: 'center', cursor: 'pointer' }}/>
                </Box>
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}

export default MusicCLipsPage