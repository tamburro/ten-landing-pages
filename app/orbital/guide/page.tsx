import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "ORBITAL — build guide",
};

export default function OrbitalGuide() {
  return (
    <Guide
      slug="orbital"
      title="ORBITAL OS-1"
      tagline="Physically-based glass rendered live — transmission, iridescence, and a scroll-driven camera rig doing a product shoot."
    >
      <h2>The one idea</h2>
      <p>
        A luxury product page where the product photography is a <strong>live render</strong>.
        The object is a (3,2) torus knot in Three.js&apos;s{" "}
        <code>MeshPhysicalMaterial</code> with real glass parameters —{" "}
        <code>transmission: 1</code>, <code>ior: 1.52</code> (actual BK7 glass),{" "}
        <code>thickness: 1.8</code> for internal refraction, clearcoat, and a blue-tinted{" "}
        <code>attenuationColor</code> so light picks up color as it travels through the body.
      </p>

      <h2>Lighting without assets</h2>
      <p>
        Transmission needs an environment to refract. Instead of an HDRI file, the scene uses{" "}
        <code>RoomEnvironment</code> — Three.js&apos;s procedural studio — run through{" "}
        <code>PMREMGenerator</code>. Two colored point lights (electric blue key, warm rim) give
        the glass something chromatic to bend. An emissive icosahedron pulses inside the knot so
        the "core" reads through the refraction. ACES tone mapping keeps highlights from clipping.
      </p>

      <h2>The camera rig</h2>
      <ul>
        <li>
          All camera state lives in one plain <code>rig</code> object (position, look-at target,
          iridescence, spin rate, core scale). A GSAP timeline scrubs it through four keyframes —
          reveal → side orbit → macro close-up → top-down — pinned to the journey&apos;s scroll
          progress, and a second trigger pulls back for the finale while raising spin and core
          glow.
        </li>
        <li>
          The render loop is the single consumer: it reads the rig each frame, adds smoothed
          mouse parallax (5% lerp), and calls <code>lookAt</code>. GSAP never touches the camera
          directly, which keeps scroll, parallax, and idle rotation from fighting.
        </li>
        <li>
          <strong>Iridescence is a narrative beat:</strong> it stays at 0 until the "Light,
          taught manners" chapter, where the timeline raises it to 1 — the coating switches on
          exactly when the copy mentions it.
        </li>
      </ul>

      <h2>Design system</h2>
      <ul>
        <li>
          Palette: graphite <code>#0c0e12</code>, silver text <code>#e6e9ef</code>, one electric
          blue <code>#8ab4ff</code>. Chapter cards are frosted (<code>backdrop-blur</code> over
          the live render) and alternate sides so they never cover the object&apos;s densest
          silhouette.
        </li>
        <li>
          Type: Unbounded for display (wide, techy, used sparingly at light weights), Manrope for
          body. Spec sheet set as a hairline-divided grid — watch-catalog conventions.
        </li>
        <li>
          Copy sells absence: “The OS-1 does nothing.” A product this useless needs perfect
          rendering — that&apos;s the joke and the brief.
        </li>
      </ul>

      <h2>Performance & accessibility</h2>
      <ul>
        <li>Pixel ratio capped at 1.75; the knot is ~19k triangles — trivial for any GPU that supports transmission.</li>
        <li>rAF pauses on tab blur; full dispose of geometry, materials, env texture and PMREM on unmount.</li>
        <li>Reduced motion: one static frame from the side view with iridescence pre-set, and no scroll rig.</li>
      </ul>

      <h2>Libraries</h2>
      <p>Three.js (MeshPhysicalMaterial, RoomEnvironment, PMREM), GSAP ScrollTrigger, Tailwind.</p>
    </Guide>
  );
}
