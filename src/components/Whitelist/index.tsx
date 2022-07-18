import { ethers } from "ethers";
import { connectWallet } from "../ConnectWallet";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import LinkGraphic from "../../images/link.svg";
import InvestingGraphic from "../../images/investing.svg";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Whitelist = () => {
  let query = useQuery();

  async function copyTextToClipboard(text: string) {
    return new Promise((resolve, reject) => {
      const _asyncCopyFn = async () => {
        try {
          const value = await navigator.clipboard.writeText(text);
          resolve(value);
        } catch (e) {
          reject(e);
        }
        window.removeEventListener("focus", _asyncCopyFn);
      };

      window.addEventListener("focus", _asyncCopyFn);
    });
  }

  function loadingElement(id: string) {
    const button = document.getElementById(id);
    if (button != null) {
      button.textContent = "Loading";
      button.className = "btn btn-warning";
    }
  }

  function errorElement(id: string) {
    const button = document.getElementById(id);
    if (button != null) {
      button.textContent = "Error";
      button.className = "btn btn-error";
    }
  }

  const onJoinClick = async () => {
    loadingElement("joinWhitelistButton");
    const result = await connectWallet("joinWhitelistButton", "Connected");
    if (!result) {
      return;
    }
    loadingElement("joinWhitelistButton");
    let indicator = query.get("indicator");
    if (
      indicator == null ||
      !ethers.utils.isAddress(indicator) ||
      indicator === result.ans
    ) {
      indicator = "0x0000000000000000000000000000000000000000";
    }

    try {
      const signer = result.prov.getSigner();
      const signature = await signer.signMessage(indicator);
      const address = result.ans;

      const body = {
        indicator: indicator,
        signature: signature,
        address: address,
      };

      axios
        .post("http://localhost:5500/whitelist", body)
        .then(function (response) {
          if (response.status === 201) {
            const button = document.getElementById("joinWhitelistButton");
            if (button != null) {
              button.textContent = "Joined";
              button.className = "btn btn-success";
            }
          } else {
            errorElement("joinWhitelistButton");
          }
        })
        .catch(function () {
          errorElement("joinWhitelistButton");
          return;
        });
    } catch {
      errorElement("joinWhitelistButton");
      return;
    }
  };

  const onGetLinkClick = async () => {
    loadingElement("getLinkButton");
    const result = await connectWallet("getLinkButton", "Copied");
    if (result) {
      await copyTextToClipboard(
        `http://localhost:3000/whitelist?indicator=${result.ans}`
      );
    }
  };

  return (
    <div className="hero min-h-screen pb-[10%]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <label className="swap swap-flip text-9xl">
          <input type="checkbox" />

          <div className="swap-off">
            <img
              src={LinkGraphic}
              className="max-h-80 rounded-lg drop-shadow-2xl"
              alt="Two people sharing a link"
            />
          </div>
          <div className="swap-on">
            <img
              src={InvestingGraphic}
              className="max-h-80 rounded-lg drop-shadow-2xl"
              alt="Someone looking at the investment results"
            />
          </div>
        </label>
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Join the Whitelist</h1>
          <p className="py-6">
            After joining the whitelist, simply copy your link and invite your
            friends to rise in the line. This way you will be one of the first
            to get an $S2T token!
          </p>
          <div className="flex flex-col lg:flex-row m-auto">
            <div className="grid flex-grow h-32 card rounded-box place-items-center">
              <button
                className="btn btn-outline"
                id="joinWhitelistButton"
                onClick={() => onJoinClick()}
              >
                Join Whitelist Line
              </button>
            </div>
            <div className="divider lg:divider-horizontal">AND</div>
            <div className="grid flex-grow h-32 card rounded-box place-items-center">
              <button
                className="btn btn-outline"
                id="getLinkButton"
                onClick={() => onGetLinkClick()}
              >
                Your Invite Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
