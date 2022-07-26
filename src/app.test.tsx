import "@testing-library/jest-dom";
import { generateTestingUtils } from "eth-testing";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { render, screen, waitFor, within } from "@testing-library/react";

describe("Connect web3 wallet", () => {
  const testingUtils = generateTestingUtils({ providerType: "default" });
  async function renderClickConnect() {
    render(<App />);
    const connectButton = await screen.findByRole("button", {
      name: /Connect Wallet/i,
    });
    userEvent.click(connectButton);
  }

  beforeAll(() => {
    global.window.ethereum = testingUtils.getProvider();
  });
  afterEach(() => {
    testingUtils.clearAllMocks();
  });

  test("Usual wallet connect", async () => {
    testingUtils.mockNotConnectedWallet();
    testingUtils.mockRequestAccounts([
      "0x00000000219ab540356cBB839Cbe05303d7705Fa",
    ]);
    await renderClickConnect();
    const connectedButton = await waitFor(() =>
      screen.findByRole("button", {
        name: /Connected/i,
      })
    );
    expect(connectedButton).toBeInTheDocument();
  });

  test("Already connected wallet", async () => {
    testingUtils.mockConnectedWallet([
      "0x00000000219ab540356cBB839Cbe05303d7705Fa",
    ]);
    await renderClickConnect();
    const connectedButton = await waitFor(() =>
      screen.findByRole("button", {
        name: /Connected/i,
      })
    );
    expect(connectedButton).toBeInTheDocument();
  });

  test("Undefined window error", async () => {
    testingUtils.mockNotConnectedWallet();
    global.window.ethereum = undefined;
    await renderClickConnect();
    const errorButton = await waitFor(() =>
      screen.findByRole("button", {
        name: /404/i,
      })
    );
    expect(errorButton).toBeInTheDocument();
  });
});

describe("Whitelist buttons", () => {
  const testingUtils = generateTestingUtils({ providerType: "default" });

  beforeAll(() => {
    global.window.ethereum = testingUtils.getProvider();
  });
  afterEach(() => {
    testingUtils.clearAllMocks();
  });

  async function openWhitelistAndButton(name: string) {
    render(<App />);
    const navbar = screen.getByTestId("navbar");
    const whitelistButton = await within(navbar).findByRole("link", {
      name: /Whitelist/i,
    });
    userEvent.click(whitelistButton);
    const button = await screen.findByRole("button", { name: name });
    return button;
  }

  test("Copy link connected", async () => {
    testingUtils.mockConnectedWallet([
      "0x00000000219ab540356cBB839Cbe05303d7705Fa",
    ]);
    userEvent.click(await openWhitelistAndButton("Your Invite Link"));
    const copiedButton = await waitFor(() =>
      screen.findByRole("button", {
        name: /Copied/i,
      })
    );
    expect(copiedButton).toBeInTheDocument();
  });

  test("Window connection pop-up", async () => {
    testingUtils.mockNotConnectedWallet();
    testingUtils.mockRequestAccounts([
      "0x00000000219ab540356cBB839Cbe05303d7705Fa",
    ]);
    userEvent.click(await openWhitelistAndButton("Your Invite Link"));
    const copiedButton = await waitFor(() =>
      screen.findByRole("button", {
        name: /Copied/i,
      })
    );
    expect(copiedButton).toBeInTheDocument();
  });

  test("Undefined window error", async () => {
    global.window.ethereum = undefined;
    userEvent.click(await openWhitelistAndButton("Your Invite Link"));
    const errorButton = await waitFor(() =>
      screen.findByRole("button", {
        name: /404/i,
      })
    );
    expect(errorButton).toBeInTheDocument();
  });
});

describe("Navbar links", () => {
  async function findLinkByName(name: string) {
    render(<App />);
    const navbar = screen.getByTestId("navbar");
    const link = await within(navbar).findByRole("link", { name: name });
    return link;
  }

  test("Link to s2t", async () => {
    const link = await findLinkByName("Skill2Token");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  test("Link to home", async () => {
    const link = await findLinkByName("Home");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  test("Link to whitelist", async () => {
    const link = await findLinkByName("Whitelist");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/whitelist");
  });
  test("Link to whitepaper", async () => {
    const link = await findLinkByName("Whitepaper");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/whitepaper");
  });
  test("Link to community", async () => {
    const link = await findLinkByName("Community");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/community");
  });
});

describe("Community links", () => {
  async function openCommunityTab() {
    render(<App />);
    const communityButton = await screen.findByRole("button", {
      name: /Community/i,
    });
    userEvent.click(communityButton);
  }

  test("Twitter link", async () => {
    await openCommunityTab();
    const followLink = await screen.findByRole("link", {
      name: /Follow/i,
    });
    expect(followLink).toHaveAttribute("target", "_blank");
    expect(followLink).toHaveAttribute("rel", "noreferrer");
  });

  test("Discord link", async () => {
    await openCommunityTab();
    const joinLink = await screen.findByRole("link", {
      name: /Join/i,
    });
    expect(joinLink).toHaveAttribute("target", "_blank");
    expect(joinLink).toHaveAttribute("rel", "noreferrer");
  });

  test("Youtube link", async () => {
    await openCommunityTab();
    const subscribeLink = await screen.findByRole("link", {
      name: /Subscribe/i,
    });
    expect(subscribeLink).toHaveAttribute("target", "_blank");
    expect(subscribeLink).toHaveAttribute("rel", "noreferrer");
  });
});
