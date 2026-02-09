import { useEffect, useState } from "react";
import Scene from "./Scene";
import { useLoading } from "../../context/LoadingProvider";

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const CharacterModel = () => {
  const [webgl, setWebgl] = useState(true);
  const { setLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const available = isWebGLAvailable();
    setWebgl(available);
    if (!available) {
      // Skip 3D — fast-forward loading so the site still works
      setLoading(100);
      setTimeout(() => setIsLoading(false), 1800);
    }
  }, []);

  if (!webgl) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    );
  }

  return <Scene />;
};

export default CharacterModel;
