import { Link } from "react-router-dom";
import CertificateGraphic from "../../images/certificate.svg";
import VotingGraphic from "../../images/voting.svg";
import HiringGraphic from "../../images/hiring.svg";
import LineGraphic from "../../images/line.svg";
import "./styles.css";

const Home = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={CertificateGraphic}
            className="max-h-80 rounded-lg drop-shadow-2xl"
            alt="Person with certificate"
          />
          <div className="pr-16 max-w-xl">
            <h1 className="text-5xl font-bold">
              Get a <mark>professional certificate</mark> within 24 hours
            </h1>
            <p className="py-6">
              Young professionals go through the everyday pain of having to
              demonstrate their skills to the market without having the formal
              means to do so. Either they lack certification or their skillset
              doesn't fit the imposed requirements. Quite often, the needs of
              the market are not for a highly skilled professional who has
              undertaken a tortuous certification process, but for a technician
              with a very specific talent. That's where <mark>Skill2Token</mark>{" "}
              comes in.
            </p>
            <Link to="whitepaper">
              <button className="btn btn-primary">Whitepaper</button>
            </Link>
          </div>
        </div>
      </div>
      <h3 className="text-center text-5xl font-bold">✨ Benefits ✨</h3>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={VotingGraphic}
            className="max-h-80 rounded-lg drop-shadow-2xl"
            alt="People voting"
          />
          <div className="pl-16 max-w-xl">
            <h1 className="text-5xl font-bold">🧑 For the User</h1>
            <p className="py-6">
              When someone applies for a token with their skill portfolio, the
              voting process that lasts 24 hours begins, and anyone with an{" "}
              <mark>$S2T</mark> token can approve or deny the application. In
              the end, the losing side tokens (the one with the fewer coins
              invested) are divided proportionally between the winner side. This
              approach has an extensive list of benefits, such as
              decentralization, transparency, community power, and the incentive
              to think well before voting, so as not to lose all the coins you
              invested.
            </p>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={HiringGraphic}
            className="max-h-80 rounded-lg drop-shadow-2xl"
            alt="A resume selected amongst many"
          />
          <div className="pr-16 max-w-xl">
            <h1 className="text-5xl font-bold">For the Company 🏢</h1>
            <p className="py-6">
              Any recruiter you ask will tell you how hard it is to find the
              people with the right skill your team is looking for. With{" "}
              <mark>Skill2Token</mark> this becomes a trivial task, and it's
              only a matter of searching for the token that fits your
              requirements, and look up the ones that possess it, potentially
              saving thousands (if not millions) in resources.
            </p>
          </div>
        </div>
      </div>
      <h3 className="text-center text-5xl font-bold">📜 Whitelist 📜</h3>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={LineGraphic}
            className="max-h-80 rounded-lg drop-shadow-2xl"
            alt="A line of people waiting their turn"
          />
          <div className="pl-16 max-w-xl">
            <h1 className="text-5xl font-bold">❔ How it works</h1>
            <p className="py-6">
              A whitelist is a list of users allowed to do something before the
              rest, in <mark>Skill2Token's</mark> case, the whitelisted users
              can buy <mark>$S2T</mark> tokens before anyone else and,
              obviously, this makes for a great opportunity to join the
              community for a lower price. To get into the whitelist is simple,
              just invite your friends into it with your link, and we will
              choose the top ones to join it.
            </p>
            <Link to="/whitelist">
              <button className="btn btn-primary">Whitelist</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
