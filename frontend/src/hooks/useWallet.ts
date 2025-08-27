// hooks/useWallet.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setWallet, clearWallet } from "../store/walletSlice";
import { useCallback, useEffect } from "react";

export function useWallet() {
  const dispatch = useDispatch<AppDispatch>();
  const wallet = useSelector((state: RootState) => state.wallet);

  const connectWallet = useCallback(async () => {
    if (!(window as any).ethereum) {
      alert("Metamask not detected");
      return;
    }

    try {
      const provider = (window as any).ethereum;
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const chainId = await provider.request({ method: "eth_chainId" });

      dispatch(setWallet({ address: accounts[0], chainId }));
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!(window as any).ethereum) return;

    const provider = (window as any).ethereum;

    const handleAccountsChanged = (newAccounts: string[]) => {
      if (newAccounts.length > 0) {
        provider.request({ method: "eth_chainId" }).then((chainId: string) => {
          dispatch(setWallet({ address: newAccounts[0], chainId }));
        });
      } else {
        dispatch(clearWallet());
      }
    };

    const handleChainChanged = (newChainId: string) => {
      provider.request({ method: "eth_requestAccounts" }).then((accounts: string[]) => {
        dispatch(setWallet({ address: accounts[0], chainId: newChainId }));
      });
    };

    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);

    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("chainChanged", handleChainChanged);
    };
  }, [dispatch]);

  const disconnectWallet = useCallback(() => {
    dispatch(clearWallet());
  }, [dispatch]);

  return {
    wallet,
    connectWallet,
    disconnectWallet,
  };
}