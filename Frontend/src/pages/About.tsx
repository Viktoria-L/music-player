const About = () => {
  return (
    <div className="about wrapper">
      <div>
        <h2 className="text-4xl font-bold tracking-wider">About</h2>

        <p className="tracking-wide mt-2 mb-8">
          This music player is my graduation project as a frontend developer.
          This is the frontend part of the application. For full code visit my
          repository here:
          <br />
          <a
            className="text-orange"
            href="https://github.com/Viktoria-L/music-player"
          >
            Project on github
          </a>
          <br />
          Music provided by{" "}
          <a
            className="text-orange"
            href="https://www.jamendo.com/start"
            target="_blank"
          >
            Jamendo
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
