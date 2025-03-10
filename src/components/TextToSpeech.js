const speak = (text, lang = "en-US") => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  // Récupérer les voix disponibles
  const voices = synth.getVoices();

  // Sélectionner une voix en fonction de la langue
  let selectedVoice = voices.find(voice => voice.lang === lang);

  // Si aucune voix n'est trouvée, prendre une voix par défaut
  if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.lang.startsWith(lang.split('-')[0]));
  }

  if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log("Using voice:", selectedVoice.name);
  } else {
      console.warn("No voice found for", lang);
  }

  utterance.lang = lang;
  utterance.rate = 1; // Vitesse normale (ajuste entre 0.5 et 2)
  utterance.pitch = 1; // Tonalité normale (ajuste entre 0 et 2)
  utterance.volume = 1; // Volume maximum (0 à 1)

  synth.speak(utterance);
};

export default speak;
