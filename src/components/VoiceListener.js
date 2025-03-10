import { useEffect, useState } from "react";

const VoiceListener = ({ onTaskRequested }) => {
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if SpeechRecognition is available
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      console.error("Speech Recognition not supported in this browser.");
      return;
    }

    // Function to initialize speech recognition
    const startSpeechRecognition = () => {
      const RecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionObj = new RecognitionClass();

      recognitionObj.continuous = true;
      recognitionObj.interimResults = false;
      recognitionObj.lang = "en-US";

      recognitionObj.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.trim();
        console.log("Heard:", transcript);

        // Trigger AI when calling its name
        if (transcript.toLowerCase().includes("boss") || transcript.toLowerCase().includes("ai")) {
          console.log("AI Triggered!");
          onTaskRequested();
        }
      };

      recognitionObj.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "no-speech") {
          console.warn("No speech detected. Try speaking closer to the mic.");
        }
      };

      // Start recognition
      recognitionObj.start();
      setRecognition(recognitionObj);
    };

    startSpeechRecognition();

    return () => {
      if (recognition) {
        recognition.stop();
        console.log("Voice recognition stopped.");
      }
    };
  }, [onTaskRequested]);

  return null;
};

export default VoiceListener;
