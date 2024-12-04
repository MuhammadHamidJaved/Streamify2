import React from "react";

interface PlayerControlsProps {
  setPlayer: (player: string) => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({ setPlayer }) => {
  return (
    <div style={{ display: "flex", justifyContent: "start", alignItems: "center", margin: "20px", padding: "20px", backgroundColor: "#a3b18a", height: "100px" }}>
      <h4 style={{ marginRight: "10px", color: "#344e41" }}>Servers:</h4>
      <button
        style={{ backgroundColor: "#588157", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}
        onClick={() => setPlayer("vidsrc")}
      >
        Vidsrc
      </button>
      <button
        style={{ backgroundColor: "#588157", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}
        onClick={() => setPlayer("other")}
      >
        Other
      </button>
    </div>
  );
};
