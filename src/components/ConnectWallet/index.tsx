import { ethers } from "ethers";

async function requestAccount() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}

export async function connectWallet(buttonId: string, connectedText: string) {
  if (typeof window.ethereum !== "undefined") {
    const reqAns = await requestAccount();
    const button = document.getElementById(buttonId);
    if (reqAns && button != null) {
      button.textContent = connectedText;
      button.className = "btn btn-success";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      return { ans: reqAns, prov: provider };
    } else if (button != null) {
      button.textContent = "Error";
      button.className = "btn btn-error";
    }
  } else {
    const button = document.getElementById(buttonId);
    if (button != null) {
      button.textContent = "404";
      button.className = "btn btn-error";
    }
  }
}
