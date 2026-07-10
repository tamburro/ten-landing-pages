import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Morph — build guide",
};

export default function MorphGuide() {
  return (
    <Guide
      slug="morph"
      title="Morph"
      tagline="30,000 GPU particles morphing between four procedural forms, with the interpolation done entirely in the vertex shader."
    >
      <h2>The one idea</h2>
      <p>
        The hero object isn&apos;t decoration — it <em>narrates</em>. Each scroll stage of the
        story (raw data → embeddings → trained model → serving) is a shape, and one particle
        system morphs through all four: a gaussian chaos cloud, a Fibonacci sphere, a (2,3) torus
        knot, and a three-armed spiral galaxy.
      </p>

      <h2>Geometry: four targets in one buffer</h2>
      <ul>
        <li>
          All four shapes are generated on the CPU once (plain math, no assets) and uploaded as
          vertex attributes: <code>position</code> holds the chaos cloud, <code>aP1..aP3</code>{" "}
          hold the other targets, plus one random float <code>aRnd</code> per particle.
        </li>
        <li>
          <strong>Fibonacci sphere</strong>: golden-angle spiral for perfectly even coverage.{" "}
          <strong>Torus knot</strong>: the parametric curve with a random disc offset for a fuzzy
          tube. <strong>Galaxy</strong>: radius drawn from <code>pow(random, 1.6)</code> for a
          dense core, three arms via angular offset, arm spread tightening with radius.
        </li>
      </ul>

      <h2>The morph is a shader, not a tween</h2>
      <p>
        A single uniform <code>uMorph ∈ [0,3]</code> drives a chained{" "}
        <code>mix(mix(mix(p0,p1),p2),p3)</code> with <code>smoothstep</code> windows in the vertex
        shader. Two details make it feel alive:
      </p>
      <ul>
        <li>
          <strong>Per-particle stagger:</strong> each particle offsets the morph value by{" "}
          <code>(aRnd − 0.5) · 0.5</code>, so transitions ripple through the cloud instead of
          moving in lockstep.
        </li>
        <li>
          <strong>Double smoothing:</strong> ScrollTrigger scrubs a target value, and the render
          loop eases the uniform toward it (<code>morph += (target − morph) · 0.06</code>). Even a
          violent scroll flick produces silk.
        </li>
      </ul>
      <p>
        Points are additive-blended with <code>depthWrite: false</code>; size falls off with
        distance (<code>26/−mv.z</code>). Color is a violet→cyan ramp on morph progress with a
        magenta sprinkle from <code>aRnd</code>, so the palette shifts as the system "learns."
      </p>

      <h2>Scroll architecture</h2>
      <ul>
        <li>
          The canvas is <code>position: fixed</code> behind everything. A 4×120vh "journey"
          section maps its scroll progress to <code>uMorph</code>; each stage&apos;s copy fades in
          at 70% viewport and scrubs out near the top, alternating left/right so the text never
          fights the densest part of the form.
        </li>
        <li>
          After the journey, a scrubbed opacity tween dims the field to 22% so the outro sections
          read cleanly over it.
        </li>
        <li>
          Reduced motion: the loop never starts; the field holds a still of the sphere stage.
        </li>
      </ul>

      <h2>Design system</h2>
      <p>
        Syne (extrabold, tight leading) gives the display type a slightly alien geometry that
        matches the particle forms; Space Mono does the telemetry readouts (
        <code>state: TRAINED · loss: 0.017</code>). Palette: deep violet-black{" "}
        <code>#0b0613</code>, violet <code>#7c3aed</code>, cyan <code>#22d3ee</code> — the
        gradient only ever appears on the words that carry the thesis.
      </p>

      <h2>Libraries</h2>
      <p>Three.js (BufferGeometry + ShaderMaterial + Points), GSAP ScrollTrigger, Tailwind.</p>
    </Guide>
  );
}
