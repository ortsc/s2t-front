import axios from "axios";
import { ethers } from "ethers";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../ConnectWallet";
import { getCookie } from "../Cookies";
import { successElement, loadingElement, errorElement } from "../ChangeElement";
const JoinWhitelist = () => {
  function getValidIndicator(address: string) {
    const indicator = getCookie("indicator");
    if (
      indicator === "" ||
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
    indicator: string,
    tokenType: string,
    accessToken: string
  ) {
    const signer = result.prov.getSigner();
    const signature = await signer.signMessage(indicator);
    const address = result.ans;
    return {
      indicator: indicator,
      signature: signature,
      address: address,
      tokenType: tokenType,
      accessToken: accessToken,
    };
  }

  const navigate = useNavigate();

  const onJoinClick = async () => {
    loadingElement("button-join-whitelist");
    const result = await connectWallet("button-join-whitelist", "Connected");
    if (!result) {
      return;
    }
    loadingElement("button-join-whitelist");

    const indicator = getValidIndicator(result.ans);

    try {
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const [accessToken, tokenType] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
      ];
      if (tokenType == null || accessToken == null) {
        throw new Error("Missing parameter.");
      }
      const body = await getPostBody(result, indicator, tokenType, accessToken);

      axios
        .post("https://api.skill2token.com/whitelist", body)
        .then(function (response) {
          if (response.status === 201) {
            successElement("button-join-whitelist", "Joined");
            navigate("/success");
          } else {
            errorElement("button-join-whitelist");
            console.log(response.status);
          }
        })
        .catch(
          (error) =>
            function () {
              errorElement("button-join-whitelist");
              console.log(error);
              return;
            }
        );
    } catch (error) {
      errorElement("button-join-whitelist");
      console.log(error);
      return;
    }
  };
  return (
    <div className="text-center min-h-screen pb-[10%] flex justify-center items-center">
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold pb-8">🥁 Almost Done 🥁</h1>
        <p className="text-2xl pb-8">
          Sign the address and you're all set to enjoy the whitelist!
        </p>
        <button
          className="btn btn-outline gap-2 hover:fill-black"
          id="button-join-whitelist"
          onClick={() => onJoinClick()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            height="24"
            width="24"
            className="fill-current"
          >
            <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />{" "}
          </svg>
          Join Whitelist
        </button>
      </div>
    </div>
  );
};

export default JoinWhitelist;
