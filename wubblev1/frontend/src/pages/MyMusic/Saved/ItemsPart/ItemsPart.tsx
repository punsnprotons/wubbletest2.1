import { useEffect, useState } from 'react'
import styles from './ItemsPart.module.css'
import { Box, InputAdornment, Typography, Tooltip } from '@mui/material'
import { CustomTextFieldTertiary } from '../../../../components/base/TextField/CustomTextField'
import SearchIcon from '@mui/icons-material/Search';
import { CustomSelectSecondary } from '../../../../components/base/Select/CustomSelect';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MusicNoteIcon2 from '../../../../components/icons/MusicNoteIcon2';
import EditIcon from '../../../../components/icons/EditIcon';
import CustomCheckbox from '../../../../components/base/Checkbox/CustomCheckbox';
import PlayIcon from '../../../../components/icons/PlayIcon';
import { useGetGenreListQuery } from '../../../../api/genreGeneration/genreGenerationRest';
import { useGetLyricListQuery } from '../../../../api/lyric/lyricRest';
import PauseIcon from '../../../../components/icons/PauseIcon';
import ChevronIcon from '../../../../components/icons/ChevronIcon';
import EditItemDialog from '../../../../components/EditItemDialog/EditItemDialog';
import { getCurrentDimension, timeFormat } from '../../../../constants';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useGetOssUrlMutation } from '../../../../api/base/baseRest';
import Toast from '../../../../components/base/Toast/Toast';

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

const dummyVocals = [
    {
        id: 1,
        name: 'AI Michael Model',
        time: 11
    },
    {
        id: 2,
        name: 'AI Patrick Model',
        time: 10,
    },
    {
        id: 3,
        name: 'AI Freddy Model',
        time: 8
    },
]

const ItemsPart = (props: any) => {

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

    const [sortSelected, setSortSelected] = useState({
        id: 1, name: 'Date created'
    })
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [selectedGenre, setSelectedGenre] = useState<any[]>([])
    const [selectedVocal, setSelectedVocal] = useState<any[]>([])
    const [selectedLyric, setSelectedLyric] = useState<any[]>([])
    const [genreList, setGenreList] = useState<any>([])
    const [lyricList, setLyricList] = useState<any>([])
    const [whichGenreHovered, setWhichGenreHovered] = useState<number>(999)
    const [whichVocalHovered, setWhichVocalHovered] = useState<number>(999)
    const [whichLyricExpanded, setWhichLyricExpanded] = useState<number>(999)
    const [editData, setEditData] = useState<any>({
        itemData: {},
        itemType: ''
    })
    const [isGenreCollapse, setIsGenreCollapse] = useState<boolean>(false)
    const [isVocalsCollapse, setIsVocalsCollapse] = useState<boolean>(false)
    const [isLyricsCollapse, setIsLyricsCollapse] = useState<boolean>(false)

    // tooltip for showing ellipsis title text
    const [showSongTooltip, setShowSongTooltip] = useState(0)
    const [showLyricsTooltip, setShowLyricsTooltip] = useState(0)

    // Toast state
    const [toast, setToast] = useState({
        message: "",
        type: "error",
        open: false,
        handleClose: () => {
            setToast((prev) => ({ ...prev, open: false }))
        }
    })

    // GET
    const getGenreList = useGetGenreListQuery(null)
    useEffect(() => {
        if (!getGenreList.isLoading && getGenreList.data) {
            const data = getGenreList.data
            setGenreList(data)
            props.setIsPaused(true)
        }
    }, [getGenreList])

    const getLyricList = useGetLyricListQuery(null)
    useEffect(() => {
        if (!getLyricList.isLoading && getLyricList.data) {
            const data = getLyricList.data
            setLyricList(data)
        }
    }, [getLyricList])

    // post
    const [getOssUrl] = useGetOssUrlMutation()

    useEffect(() => {
        if (selectedGenre.length > 0 || selectedLyric.length > 0) {
            props.setIsDeleteActive(true)
        } else {
            props.setIsDeleteActive(false)
        }
    }, [selectedGenre, selectedLyric, selectedVocal])

    // handle sort select
    const handleSelectChange = (e: any) => {
        const selected = sortOptions.filter(opt => opt.id === e.target.value)[0]
        setSortSelected(selected)
    }

    // handle search input
    const handleInputSearch = (e: any): void => {
        const value = e.target.value

        if (value.length < 31) {
            setSearchQuery(value)
        }
    }

    const filteredGenreItems = genreList.filter((item: any) => {
        let str = item.name
        return str.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const sortedGenreItems = filteredGenreItems.sort((a: any, b: any): any => {
        if (sortSelected.id === 1) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        else {
            return a.name.localeCompare(b.name)
        }
    })

    const filteredLyricItems = lyricList.filter((item: any) => {
        let str = item.name
        return str.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const sortedLyricItems = filteredLyricItems.sort((a: any, b: any): any => {
        if (sortSelected.id === 1) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        else {
            return a.name.localeCompare(b.name)
        }
    })

    // Individual genre checkbox
    const handleClickGenreCheckbox = (row: any) => {
        const selectedIndex = selectedGenre.map(x => x.id).indexOf(row.id)

        let newSelected = []

        if (selectedIndex === -1) {
            newSelected.push(...selectedGenre, row)
        }
        else if (selectedIndex === 0) {
            newSelected = selectedGenre.slice(1)
        }
        else if (selectedIndex === selectedGenre.length - 1) {
            newSelected = selectedGenre.slice(0, -1)
        }
        else if (selectedIndex > 0) {
            let array1 = selectedGenre.slice(0, selectedIndex)
            let array2 = selectedGenre.slice(selectedIndex + 1)
            newSelected = array1.concat(array2)
        }

        setSelectedGenre(newSelected)
        props.setSelectedData({
            genres: [...newSelected],
            lyrics: [...props.selectedData.lyrics]
        })
    }

    // Individual vocal checkbox
    const handleClickVocalCheckbox = (row: any) => {
        const selectedIndex = selectedVocal.map(x => x.id).indexOf(row.id)

        let newSelected = []

        if (selectedIndex === -1) {
            newSelected.push(...selectedVocal, row)
        }
        else if (selectedIndex === 0) {
            newSelected = selectedVocal.slice(1)
        }
        else if (selectedIndex === selectedVocal.length - 1) {
            newSelected = selectedVocal.slice(0, -1)
        }
        else if (selectedIndex > 0) {
            let array1 = selectedVocal.slice(0, selectedIndex)
            let array2 = selectedVocal.slice(selectedIndex + 1)
            newSelected = array1.concat(array2)
        }

        setSelectedVocal(newSelected)
    }

    // Individual lyric checkbox
    const handleClickLyricCheckbox = (row: any) => {
        const selectedIndex = selectedLyric.map(x => x.id).indexOf(row.id)

        let newSelected = []

        if (selectedIndex === -1) {
            newSelected.push(...selectedLyric, row)
        }
        else if (selectedIndex === 0) {
            newSelected = selectedLyric.slice(1)
        }
        else if (selectedIndex === selectedLyric.length - 1) {
            newSelected = selectedLyric.slice(0, -1)
        }
        else if (selectedIndex > 0) {
            let array1 = selectedLyric.slice(0, selectedIndex)
            let array2 = selectedLyric.slice(selectedIndex + 1)
            newSelected = array1.concat(array2)
        }

        setSelectedLyric(newSelected)
        props.setSelectedData({
            genres: [...props.selectedData.genres],
            lyrics: [...newSelected]
        })
    }

    // handle expand lyric
    const handleExpandLyric = (idx: number): void => {
        if (idx === whichLyricExpanded) {
            setWhichLyricExpanded(999)
        } else {
            setWhichLyricExpanded(idx)
        }
    }

    const isSelected = (id: string | number | undefined, type: string) => {
        let result = false
        if (type === 'genre') {
            result = selectedGenre.map(x => x.id).indexOf(id) !== -1
        } else if (type === 'lyric') {
            result = selectedLyric.map(x => x.id).indexOf(id) !== -1
        } else if (type === 'vocal') {
            result = selectedVocal.map(x => x.id).indexOf(id) !== -1
        }
        return result
    }

    // handle edit dialog
    const [openEditItemDialog, setOpenEditItemDialog] = useState<boolean>(false)
    const openOrCloseEditItemDialog = (): void => {
        setOpenEditItemDialog(!openEditItemDialog)
    }

    // handle click edit icon
    const handleClickEdit = (itemData: any, itemType: string): void => {

        setEditData({
            itemData, itemType
        })

        openOrCloseEditItemDialog()
    }

    // handle collapse items container
    const handleCollapseItems = (type: string, isCollapseAll: boolean): void => {
        if (type === 'genre') {
            setIsGenreCollapse(!isGenreCollapse)
        } else if (type === 'vocals') {
            setIsVocalsCollapse(!isVocalsCollapse)
        } else if (type === 'lyrics') {
            setIsLyricsCollapse(!isLyricsCollapse)
        } else if ('all') {
            if (isCollapseAll) {
                setIsGenreCollapse(false)
                setIsVocalsCollapse(false)
                setIsLyricsCollapse(false)
            } else {
                setIsGenreCollapse(true)
                setIsVocalsCollapse(true)
                setIsLyricsCollapse(true)
            }
        }
    }

    // donwload song function
    const downloadSong = (url: string, songName: string): void => {
        fetch(url).then(response => response.blob()).then(blob => {
            const blobUrl = window.URL.createObjectURL(new Blob([blob]))

            const fileName = `${songName}.wav`

            const aTag = document.createElement("a")

            aTag.href = blobUrl
            aTag.setAttribute("download", fileName)
            document.body.appendChild(aTag)
            aTag.click()
            aTag.remove()
        })
    }

    // handle download song
    const handleDownloadSong = async (ossFileName: string, songName: string): Promise<void> => {
        try {
            const { url } = await getOssUrl({ ossFileName }).unwrap()
            if (url) {
                downloadSong(url, songName)
            }
        } catch (e: any) {
            if (e.data) {
                setToast({
                    ...toast,
                    open: true,
                    message: e.data.message,
                    type: "error"
                })
            } else {
                setToast({
                    ...toast,
                    open: true,
                    message: e.message,
                    type: "error"
                })
            }
        }
    }

    return (
        <Box className={styles.container}>
            <Toast {...toast} />
            <EditItemDialog
                openEditItemDialog={openEditItemDialog}
                openOrCloseEditItemDialog={openOrCloseEditItemDialog}
                editData={editData}
            />
            <Box className={styles.searchAndSort}>
                <CustomTextFieldTertiary
                    variant='outlined'
                    size="small"
                    value={searchQuery}
                    id="search"
                    name="search"
                    placeholder='Search'
                    onChange={(e) => handleInputSearch(e)}
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
                    sx={{
                        width: screenSize.width > 600 ? '245px' : '48%',
                    }}
                />
                <CustomSelectSecondary
                    selected={sortSelected}
                    value={sortSelected.id}
                    placeholder='Sort by: Date created'
                    styles={{
                        width: screenSize.width > 600 ? '245px' : '48%',
                    }}
                    selectlabel='Sort by: Date created'
                    options={sortOptions}
                    onChange={(e) => handleSelectChange(e)}
                />
            </Box>
            <Box className={styles.collapseAction}>
                {
                    isGenreCollapse && isVocalsCollapse && isLyricsCollapse ?

                        <Typography
                            onClick={() => handleCollapseItems('all', true)}
                        >
                            Open All
                        </Typography>
                        :
                        <Typography
                            onClick={() => handleCollapseItems('all', false)}
                        >
                            Collapse All
                        </Typography>
                }
            </Box>
            <Box className={styles.itemsContainer}>
                <Box className={styles.genreItems}>
                    <Box
                        className={styles.itemsTitle}
                    >
                        <span>Song</span>
                        {
                            !isGenreCollapse ?
                                <KeyboardArrowUpIcon
                                    className={styles.collapseIcon}
                                    onClick={() => handleCollapseItems('genre', false)}
                                />
                                :
                                <KeyboardArrowDownIcon
                                    className={styles.collapseIcon}
                                    onClick={() => handleCollapseItems('genre', false)}
                                />
                        }
                    </Box>
                    {
                        !isGenreCollapse &&
                        <Box className={styles.genreItemsContainer}>
                            {
                                sortedGenreItems.length > 0 &&
                                sortedGenreItems.map((genre: any, idx: number) => {

                                    const isItemSelected = isSelected(genre.id, 'genre')

                                    return (
                                        <Box
                                            key={idx}
                                            className={
                                                `${styles.genreItemContainer}`
                                            }
                                            onMouseOver={
                                                () => {
                                                    setWhichGenreHovered(idx)
                                                }}

                                            onMouseLeave={
                                                () => {
                                                    setWhichGenreHovered(999)
                                                }}
                                        >
                                            <Box className={
                                                whichGenreHovered === idx || props.whichGenrePlayInMainPlayer.id === genre.id ?
                                                    `${styles.genreItem} ${styles.hoveredItem}`
                                                    :
                                                    `${styles.genreItem}`
                                            }
                                            >
                                                <Box className={styles.title}>
                                                    <Box
                                                        sx={{
                                                            width: '17px',
                                                            height: '17px Important',
                                                        }}
                                                    >
                                                        {
                                                            whichGenreHovered === idx || props.whichGenrePlayInMainPlayer.id === genre.id ?
                                                                props.whichGenrePlayInMainPlayer.id === genre.id && props.playing ?
                                                                    <PauseIcon
                                                                        sx={{
                                                                            fontSize: '20px'
                                                                        }}
                                                                        onClick={() => props.handlePause()}
                                                                    />
                                                                    :
                                                                    <PlayIcon
                                                                        onClick={() => {
                                                                            if (props.isPaused && props.whichGenrePlayInMainPlayer.id === genre.id) {
                                                                                props.handleContinue()
                                                                            } else {
                                                                                props.handleChangePlay(genre, idx, 'changePlay')
                                                                            }
                                                                        }}
                                                                        sx={{
                                                                            fontSize: '20px'
                                                                        }}
                                                                    />
                                                                :
                                                                <MusicNoteIcon2
                                                                    sx={{
                                                                        fontSize: '20px'
                                                                    }}
                                                                />
                                                        }
                                                    </Box>
                                                    <Tooltip
                                                        title={genre.name}
                                                        open={showSongTooltip === genre.id ? true : false}
                                                        onOpen={() => setShowSongTooltip(genre.id)}
                                                        onClose={() => setShowSongTooltip(0)}
                                                        PopperProps={{
                                                            style: {
                                                                maxWidth: '200px'
                                                            },
                                                            modifiers: [
                                                                {
                                                                    name: "offset",
                                                                    options: {
                                                                        offset: [-5, -10],
                                                                    },
                                                                },
                                                            ],
                                                        }}
                                                    >
                                                        <Typography
                                                            className={styles.genreName}
                                                            onClick={() => setShowSongTooltip(genre.id)}
                                                        >
                                                            {genre.name}
                                                        </Typography>
                                                    </Tooltip>
                                                </Box>
                                                <Box className={styles.actions}>
                                                    <Typography
                                                        fontSize={16}
                                                    >
                                                        00:30
                                                    </Typography>
                                                    <FileDownloadOutlinedIcon
                                                        className={styles.downloadIcon}
                                                        onClick={() => handleDownloadSong(genre.ossFileName, genre.name)}
                                                    />
                                                    <EditIcon
                                                        className={styles.editIcon}
                                                        onClick={() => handleClickEdit(genre, 'genre')}
                                                    />
                                                    <CustomCheckbox
                                                        checked={isItemSelected}
                                                        onClick={() => handleClickGenreCheckbox(genre)}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    }
                </Box>
                <Box className={styles.vocalsItems}>
                    <Box
                        className={styles.itemsTitle}
                    >
                        <span>Vocals (Coming Soon)</span>
                        {
                            !isVocalsCollapse ?
                                <KeyboardArrowUpIcon
                                    className={styles.collapseIcon}
                                    onClick={() => handleCollapseItems('vocals', false)}
                                />
                                :
                                <KeyboardArrowDownIcon
                                    className={styles.collapseIcon}
                                    onClick={() => handleCollapseItems('vocals', false)}
                                />
                        }
                    </Box>
                    {
                        !isVocalsCollapse &&
                        <Box className={styles.vocalItemsContainer}>
                            {
                                dummyVocals.length > 0 &&
                                dummyVocals.map((vocal: any, idx: number) => {

                                    const isItemSelected = isSelected(vocal.id, 'vocal');

                                    return (
                                        <Box
                                            key={idx}
                                            className={
                                                whichVocalHovered === idx ?
                                                    `${styles.vocalItem} ${styles.hoveredItem}`
                                                    :
                                                    `${styles.vocalItem}`
                                            }

                                            onMouseOver={
                                                () => {
                                                    setWhichVocalHovered(idx)
                                                }}

                                            onMouseLeave={
                                                () => {
                                                    setWhichVocalHovered(999)
                                                }}
                                        >
                                            <Box className={styles.title}>
                                                <Box
                                                    sx={{
                                                        width: '17px',
                                                        height: '17px Important',
                                                    }}
                                                >
                                                    {
                                                        whichVocalHovered === idx ?
                                                            <PlayIcon
                                                                sx={{
                                                                    fontSize: '20px'
                                                                }}
                                                            />
                                                            :
                                                            <MusicNoteIcon2
                                                                sx={{
                                                                    fontSize: '20px'
                                                                }}
                                                            />
                                                    }
                                                </Box>
                                                <Typography
                                                    fontSize={16}
                                                >
                                                    {vocal.name}
                                                </Typography>
                                            </Box>
                                            <Box className={styles.actions}>
                                                <Typography
                                                    fontSize={16}
                                                >
                                                    {timeFormat(vocal.time)}
                                                </Typography>
                                                <EditIcon
                                                    sx={{
                                                        fontSize: '20px',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                                <CustomCheckbox
                                                    checked={isItemSelected}
                                                    onClick={() => handleClickVocalCheckbox(vocal)}
                                                />
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    }
                </Box>
                <Box className={styles.lyricsItems}>
                    <Box
                        className={styles.itemsTitle}
                    >
                        <span>Lyrics</span>
                        {
                            !isLyricsCollapse ?
                                <KeyboardArrowUpIcon
                                    className={styles.collapseIcon}
                                    onClick={() => handleCollapseItems('lyrics', false)}
                                />
                                :
                                <KeyboardArrowDownIcon
                                    className={styles.collapseIcon}
                                    onClick={() => handleCollapseItems('lyrics', false)}
                                />
                        }
                    </Box>
                    {
                        !isLyricsCollapse &&
                        <Box className={styles.lyricsItemsContainer}>
                            {
                                sortedLyricItems.length > 0 &&
                                sortedLyricItems.map((lyric: any, idx: number) => {

                                    const isItemSelected = isSelected(lyric.id, 'lyric');

                                    return (
                                        <Box
                                            key={idx}
                                            className={
                                                whichLyricExpanded === idx ?
                                                    `${styles.lyricItemContainer} ${styles.expandLyric}`
                                                    :
                                                    `${styles.lyricItemContainer}`
                                            }
                                        >
                                            <Box className={styles.lyricItem}>
                                                <Box className={styles.title}>
                                                    <Box
                                                        sx={{
                                                            width: '17px',
                                                            height: '17px Important',
                                                        }}
                                                    >
                                                        <MusicNoteIcon2
                                                            sx={{
                                                                fontSize: '20px'
                                                            }}
                                                        />
                                                    </Box>
                                                    <Tooltip
                                                        title={lyric.name}
                                                        open={showLyricsTooltip === lyric.id ? true : false}
                                                        onOpen={() => setShowLyricsTooltip(lyric.id)}
                                                        onClose={() => setShowLyricsTooltip(0)}
                                                        PopperProps={{
                                                            style: {
                                                                maxWidth: '200px'
                                                            },
                                                            modifiers: [
                                                                {
                                                                    name: "offset",
                                                                    options: {
                                                                        offset: [-5, -10],
                                                                    },
                                                                },
                                                            ],
                                                        }}
                                                    >
                                                        <Typography
                                                            className={styles.lyricsName}
                                                            onClick={() => setShowLyricsTooltip(lyric.id)}
                                                        >
                                                            {lyric.name}
                                                        </Typography>
                                                    </Tooltip>
                                                </Box>
                                                <Box className={styles.actions}>
                                                    <Box className={styles.expandAction}>
                                                        <Box
                                                            sx={{
                                                                transform: whichLyricExpanded === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => handleExpandLyric(idx)}
                                                        >
                                                            <ChevronIcon
                                                                color={'#9C9C9C'}
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <EditIcon
                                                        className={styles.editIcon}
                                                        onClick={() => handleClickEdit(lyric, 'lyric')}
                                                    />
                                                    <CustomCheckbox
                                                        // checked={true}
                                                        checked={isItemSelected}
                                                        onClick={() => handleClickLyricCheckbox(lyric)}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box className={styles.lyricPart}>
                                                <div
                                                    dangerouslySetInnerHTML={
                                                        { __html: lyric.ryte }}
                                                >
                                                </div>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    }
                </Box>

            </Box>
        </Box >
    )
}

export default ItemsPart