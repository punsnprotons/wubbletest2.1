export const getCurrentDimension = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

export const debounce = (fn: any) => {
    let timeout: any = null
    return (...args: any) => {
        const next = () => fn(...args)
        clearTimeout(timeout)
        timeout = setTimeout(next, 500)
    }
}

export const validateEmail = (email: any) => {
    const regex = /^[a-zA-Z0-9]+([._\-+]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,3})+$/

    const validate = regex.test(email.trim())

    let result = {
        isError: false,
        errMsg: ''
    }

    if (!email) {
        result = {
            isError: true,
            errMsg: 'Required field.'
        }
    } else if (!validate && email.length <= 200) {
        result = {
            isError: true,
            errMsg: 'Invalid email.'
        }
    } else if (!validate && email.length > 200) {
        result = {
            isError: true,
            errMsg: 'Email cannot exceed 200 characters.'
        }
    }

    return result
}

export const validateName = (name: any) => {
    const hasSpecial = /[^a-zA-Z ]+$/.test(name.trim())

    let result = {
        isError: false,
        errMsg: ''
    }

    if (!name) {
        result = {
            isError: true,
            errMsg: 'Required field.'
        }
    }

    if (name.length > 50) {
        result = {
            isError: true,
            errMsg: 'Name cannot exceed 50 characters.'
        }
    }

    if (hasSpecial) {
        result = {
            isError: true,
            errMsg: "Can't use numbers or special characters."
        }
    }

    return result
}

export const validateMessage = (msg: any) => {
    let result = {
        isError: false,
        errMsg: ''
    }

    if (!msg) {
        result = {
            isError: true,
            errMsg: 'Required field.'
        }
    }

    if (msg.length > 500) {
        result = {
            isError: true,
            errMsg: 'Message cannot exceed 500 characters.'
        }
    }

    return result
}

export const validatePassword = (password: string) => {
    // const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

    // let validate = regex.test(password.trim())

    let validate = password.length >= 8

    let result = {
        isError: false,
        errMsg: ''
    }

    if (!password) {
        result = {
            isError: true,
            errMsg: 'Required field.'
        }
    } else if (!validate) {
        result = {
            isError: true,
            // errMsg: 'Not a valid password.'
            errMsg: 'Password must include at least 8 characters; a lower-case letter; one capital letter; and one number.'
        }
    }

    return result
}

export const validatePasswordv2 = (password: string) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

    let validate = regex.test(password.trim())

    let result = {
        isError: false,
        errMsg: ''
    }

    if (!password) {
        result = {
            isError: true,
            errMsg: 'Required field.'
        }
    } else if (!validate) {
        result = {
            isError: true,
            // errMsg: 'Not a valid password.'
            errMsg: 'Password must include at least 8 characters; a lower-case letter; one capital letter; and one number.'
        }
    }

    return result
}

export const validateLowerCase = (password: string) => {
    const isLowerCase = /[a-z]/.test(password)

    let result = {
        isError: false,
        errMsg: ''
    }

    if (!isLowerCase) {
        result = {
            isError: true,
            errMsg: 'a lower-case letter'
        }
    }

    return result
}

export const validateUpperCase = (password: string) => {
    const isUpperCase = /[A-Z]/.test(password)

    let result = {
        isError: false,
        errMsg: ''
    }

    if (!isUpperCase) {
        result = {
            isError: true,
            errMsg: 'a capital letter'
        }
    }

    return result
}

export const validateNumber = (password: string) => {
    const isNumber = /\d/.test(password)

    let result = {
        isError: false,
        errMsg: ''
    }

    if (!isNumber) {

        result = {
            isError: true,
            errMsg: 'a number'
        }
    }

    return result
}

export const validateVibe = (value: string) => {
    let result = {
        isError: false,
        errMsg: ''
    }

    if (!value) {
        result = {
            isError: true,
            errMsg: 'Required field.'
        }
    } else if (value.length > 200) {
        result = {
            isError: true,
            errMsg: 'Vibe cannot exceed 200 characters.'
        }
    }

    return result
}

export const validateFileSize = (size: number) => {
    let result = {
        isError: false,
        errMsg: ''
    }

    // 2 MB max
    if (size > 2097152) {
        result = {
            isError: true,
            errMsg: 'File cannot exceed 2 MB.'
        }
    }

    return result
}

export const validateAudioType = (type: string) => {
    let result = {
        isError: false,
        errMsg: ''
    }

    const filetype = "audio/mpeg, audio/wav";

    if (!filetype.includes(type)) {
        result = {
            isError: true,
            errMsg: 'Only files of type .mp3 and .wav is allowed.'
        }
    }

    return result
}

export const validateMatchPassword = (password: string, confirmPassword: string) => {
    let result = {
        isError: false,
        errMsg: ''
    }

    if (password !== confirmPassword) {
        result = {
            isError: true,
            errMsg: 'Passwords do not match.'
        }
    } else {
        result = {
            isError: false,
            errMsg: ''
        }
    }

    return result
}

export const setLocalStorageToken = (data: any) => {

}

export const getAuthToken = () => {
    return localStorage.getItem('wubble-auth-token')
}

export const validateLyricPrompt = (value: string) => {
    let result = {
        isError: false,
        errMsg: ''
    }

    if (!value) {
        result = {
            isError: true,
            errMsg: 'Required field.'
        }
    } else if (value.length > 200) {
        result = {
            isError: true,
            errMsg: 'Prompt cannot exceed 200 characters.'
        }
    }

    return result
}

export const timeFormat = (seconds: number) => {
    return new Date(seconds * 1000)
        .toISOString()
        .slice(14, 19);
}

export const getLatestTitle = (data: any[], type: string) => {
    if (!data.length) {
        return `songname-${type}-1`
    }

    let sortedData = [...data]
    sortedData.sort((a: any, b: any): any => {
        const numericA = parseInt(a.name.split('-')[2]);
        const numericB = parseInt(b.name.split('-')[2]);

        return numericA - numericB;
    })

    const array = sortedData.filter((item) => {
        if (item.name.includes(`songname-${type}-`)) {
            return item
        }
    })

    // if (!array ) {
    if (array.length === 0) {
        return `songname-${type}-1`
    }

    const currentCount = array[array.length - 1].name.split('-')[2]

    const count = +currentCount + 1

    if (type === 'song') {
        return `songname-song-${count}`
    } else if (type === 'lyric') {
        return `songname-lyrics-${count}`
    }
}

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export const convertMsToTime = (milliseconds: number, generationType: string) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    // let hours = Math.floor(minutes / 60);
    let result = '';

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    // hours = hours % 24;

    if (generationType === 'song') {
        result = `${padTo2Digits(minutes)}.${padTo2Digits(seconds)}`
    }
    
    if (generationType === 'lyrics') {
        result = `${padTo2Digits(seconds)}`
    }

    return result
}