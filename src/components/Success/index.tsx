import { Link } from "react-router-dom";
import { connectWallet } from "../ConnectWallet";

const Success = () => {
  function loadingElement(id: string) {
    const button = document.getElementById(id);
    if (button != null) {
      button.textContent = "Loading";
      button.className = "btn btn-warning";
    }
  }
  async function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
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
    <div className="text-center min-h-screen pb-[10%] flex justify-center items-center">
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold pb-8">🎉 You Did It! 🎉</h1>
        <p className="text-2xl pb-8">
          Congrats, now you are officially part of Skill2Token's whitelist.
          Share your link with your friends to get higher positions on it!
        </p>
        <div className="flex flex-col w-full lg:flex-row">
          <div className="grid flex-grow h-32 card place-items-center">
            <button
              className="btn btn-outline w-36"
              onClick={() => onGetLinkClick()}
              id="button-get-link"
            >
              Your Invite Link
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="grid flex-grow h-32 card place-items-center">
            <Link to="/" className="btn btn-outline w-36">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
