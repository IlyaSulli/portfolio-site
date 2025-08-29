import Project from "@/sections/projects/project";

export default function RollForAnswers() {
  return (
    <Project url="rollforanswers">
      <div className="mb-4 px-4">
        <h2 className="text-2xl font-bold">Listen to the Podcast</h2>
        <span>Listen anywhere you listen to your podcasts</span>
      </div>

      <iframe
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen={true}
        data-testid="embed-iframe"
        height="352"
        loading="lazy"
        src="https://open.spotify.com/embed/show/4q74qndqkKe87UJjK5ko2j?utm_source=generator"
        style={{ borderRadius: "12px" }}
        title="Roll for Answers Spotify Podcast"
        width="100%"
      />
    </Project>
  );
}
