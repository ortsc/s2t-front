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
      const asyncCopyText = async () => {
        try {
          const value = await navigator.clipboard.writeText(text);
          resolve(value);
        } catch (e) {
          reject(e);
        }
        window.removeEventListener("focus", asyncCopyText);
      };

      window.addEventListener("focus", asyncCopyText);
    });
  }

  function loadingElement(id: string) {
    const button = document.getElementById(id);
    if (button != null) {
      button.textContent = "Loading";
      button.className = "btn btn-warning";
    }
  }

  function successElement(id: string, successMessage: string) {
    const button = document.getElementById(id);
    if (button != null) {
      button.textContent = "Joined";
      button.className = "btn btn-success";
    }
  }

  function errorElement(id: string) {
    const button = document.getElementById(id);
    if (button != null) {
      button.textContent = "Error";
      button.className = "btn btn-error";
    }
  }

  function getValidIndicator(address: string) {
    const indicator = query.get("indicator");
    if (
      indicator == null ||
      !ethers.utils.isAddress(indicator) ||
      indicator === address
    ) {
      return "0x0000000000000000000000000000000000000000";
    }
    return indicator;
  }

  async function getPostBody(
    result: {
      ans: string;
      prov: ethers.providers.Web3Provider;
    },
    indicator: string
  ) {
    const signer = result.prov.getSigner();
    const signature = await signer.signMessage(indicator);
    const address = result.ans;
    return { indicator: indicator, signature: signature, address: address };
  }

  const onJoinClick = async () => {
    loadingElement("button-join-whitelist");
    const result = await connectWallet("button-join-whitelist", "Connected");
    if (!result) {
      return;
    }
    loadingElement("button-join-whitelist");

    const indicator = getValidIndicator(result.ans);

    try {
      const body = await getPostBody(result, indicator);

      axios
        .post("http://api.skill2token.com/whitelist", body)
        .then(function (response) {
          if (response.status === 201) {
            successElement("button-join-whitelist", "Joined");
          } else {
            errorElement("button-join-whitelist");
          }
        })
        .catch(function () {
          errorElement("button-join-whitelist");
          return;
        });
    } catch {
      errorElement("button-join-whitelist");
      return;
    }
  };

  const onGetLinkClick = async () => {
    loadingElement("button-get-link");
    const result = await connectWallet("button-get-link", "Copied");
    if (result) {
      await copyTextToClipboard(
        `https://skill2token.com/whitelist?indicator=${result.ans}`
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
                id="button-join-whitelist"
                onClick={() => onJoinClick()}
              >
                Join Whitelist Line
              </button>
            </div>
            <div className="divider lg:divider-horizontal">AND</div>
            <div className="grid flex-grow h-32 card rounded-box place-items-center">
              <button
                className="btn btn-outline"
                id="button-get-link"
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
