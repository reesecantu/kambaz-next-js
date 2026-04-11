import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: string;
}

const initialState: { currentUser: User | null } = {
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;