import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store';

export interface UserState {
    user: {
        userId: number | null
        email: string
        phoneNumber: string
        firstName: string
        lastName: string
        fullName: string
        role: string
        status: string
    },
}

const initialState: UserState = {
    user: {
        userId: null,
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        fullName: '',
        role: '',
        status: '',
    },
};

export const userSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        logout: () => initialState,
        setUser: (state, { payload }) => {
            const { userId, emailAddress, firstName, lastName, phoneNumber, role, status, fullName } = payload
            state.user = {
                userId: userId,
                email: emailAddress,
                phoneNumber: phoneNumber ? phoneNumber : '',
                firstName: firstName,
                lastName: lastName,
                fullName: fullName,
                role: role,
                status: status
            }
        },
    },
});

export const getUserState = (state: RootState) => state.user;

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;