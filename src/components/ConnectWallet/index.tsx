import { ethers } from "ethers";
import { loadingElement, errorElement } from "../ChangeElement";

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
      errorElement(buttonId);
    }
  } else {
    const button = document.getElementById(buttonId);
    if (button != null) {
      errorElement(buttonId);
    }
  }
}

async function copyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export const onGetLinkClick = async () => {
  loadingElement("button-get-link");
  const result = await connectWallet("button-get-link", "Copied");
  if (result) {
    await copyTextToClipboard(
      `https://skill2token.com/whitelist?indicator=${result.ans}`
    );
  }
};
