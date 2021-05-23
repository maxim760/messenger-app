export const getAudioFromBlob = (voice: Blob[]) => {
  const voiceBlob = new Blob(voice, {
    type: "audio/ogg; codecs=opus",
  });
  const audioUrl = URL.createObjectURL(voiceBlob);
  return {url: audioUrl, blob: voiceBlob}
}