import "./style.css";

const AGORA_APP_ID = "de22ecae8429443e8d97df8eb365218a";
const BANUBA_CLIENT_TOKEN =
  "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";

import { Effect, Webcam, Player, MediaStreamCapture } from "@banuba/webar";
import wasm from "@banuba/webar/BanubaSDK.wasm?url";
import simd from "@banuba/webar/BanubaSDK.simd.wasm?url";
import data from "@banuba/webar/BanubaSDK.data?url";
import AgoraRTC from "agora-rtc-sdk-ng";
const effects = ["blur_bg_2", "Background", "Earring", "glasses_Banuba", "Hipster3", "PoliceMan"];

const $main = document.querySelector<HTMLDivElement>("#main")!;

$main.addEventListener(
  "click",
  async () => {
    const player = await Player.create({
      clientToken: BANUBA_CLIENT_TOKEN,
      locateFile: {
        "BanubaSDK.data": data,
        "BanubaSDK.wasm": wasm,
        "BanubaSDK.simd.wasm": simd,
      },
    });

    player.use(new Webcam({ width: 640, height: 480 }));
    player.play({ fps: 30 });

    const videoContainer = document.createElement("div");
    const videoEl = document.createElement("video");
    videoEl.classList.add("video");
    videoContainer.appendChild(videoEl);
    $main.appendChild(videoContainer);
    //@ts-expect-error
    videoEl.srcObject = new MediaStreamCapture(player);
    videoEl.onloadedmetadata = () => videoEl.play();

    let fps = 0;
    player.addEventListener("framereceived", () => fps++);

    setInterval(() => {
      document.querySelector(`#cam`)!.textContent = fps.toFixed(1);
      fps = 0;
    }, 1000);

    const effectsEl = document.querySelector("#effects")!;

    effects.forEach(async (effectName) => {
      const btn = document.createElement("button");
      btn.classList.add("effect-button");
      btn.textContent = effectName;
      effectsEl.append(btn);
      const effect = await Effect.preload(`/effects/${effectName}.zip`);
      btn.addEventListener("click", () => player.applyEffect(effect));
      btn.classList.remove("loading");
    });

    const client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video" && user.videoTrack) {
        const videoContainer = document.createElement("div");
        $main.appendChild(videoContainer);
        //@ts-expect-error
        user.videoTrack.play($main.children.item($main.children.length - 1));
      }
      if (mediaType === "audio" && user.audioTrack) {
        user.audioTrack.setVolume(10);
        user.audioTrack.play();
      }
    });

    client.on("user-left", () => {
      $main.children.item($main.children.length - 1)?.remove();
    });

    await client.join(AGORA_APP_ID, "test", null);

    const stream = new MediaStreamCapture(player);
    const video = AgoraRTC.createCustomVideoTrack({ mediaStreamTrack: stream.getVideoTrack() });
    const audio = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish([video, audio]);

    let volume = 10;
    const toggleSound = () => {
      volume = volume ? 0 : 10;
      audio.setVolume(volume);
      document.querySelector("#sound")!.textContent = volume == 0 ? "Unmute me" : "Mute me";
    };

    document.querySelector("#sound")!.addEventListener("click", toggleSound);
  },
  { once: true }
);
