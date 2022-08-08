import ReadingGraphic from "../../images/reading.svg";
import WhitepaperPdf from "./whitepaper.pdf";

const Whitepaper = () => {
  const onWhitepaperClick = () => {
    window.open(WhitepaperPdf);
  };

  return (
    <div className="hero min-h-screen pb-[10%]">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={ReadingGraphic}
          className="max-h-80 rounded-lg drop-shadow-2xl"
          alt="Women Reading"
        />
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Read our whitepaper</h1>
          <p className="py-6">
            Our whitepaper was written with the goal to share our vision of the
            product, and we hope you can get a grasp of it if you give it a
            read. After reading it, consider becoming an active member of{" "}
            <a className="link link-primary" href="/community">
              our community
            </a>
            !
          </p>
          <button className="btn btn-primary" onClick={onWhitepaperClick}>
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;
