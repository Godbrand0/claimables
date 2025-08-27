import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
    address: string | null,
    chainId: string | null,
    isConnected:  boolean,
}
const initialState: WalletState ={
    address:null,
    chainId:null,
    isConnected:false,
}

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setWallet: (state, action: PayloadAction<{ address: string; chainId: string }>) => {
            state.address = action.payload.address;
            state.chainId = action.payload.chainId;
            state.isConnected = true;
        },
        clearWallet: (state) => {
            state.address = null;
            state.chainId = null;
            state.isConnected = false;
        },
      
    },
});

export const { setWallet, clearWallet } = walletSlice.actions;

export default walletSlice.reducer;