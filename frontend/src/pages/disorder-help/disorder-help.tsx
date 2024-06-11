import React from "react";
import { Stack, IStackTokens } from "@fluentui/react";
import {
  disorderHelpPageClassName,
  helpStepClassName,
  helpStepItemClassName,
} from "./disorder-help-style";

const stackTokens: IStackTokens = { childrenGap: 20 };

export const DisorderHelp: React.FC = () => {
  return (
    <div className={disorderHelpPageClassName}>
      <h1 style={{ color: "#563C5C", marginBottom: "20px" }}>
        Panic Disorder Help
      </h1>
      <h2 style={{ color: "#563C5C", marginBottom: "40px" }}>
        Steps to Manage Panic Disorder
      </h2>
      <Stack
        tokens={stackTokens}
        className={helpStepClassName}
        horizontalAlign="center"
      >
        <div className={helpStepItemClassName}>
          <h3>Recognize the Signs</h3>
          <p>
            Signs can be rapid heart rate,sweating, shaking, shortness of
            breath, and a feeling of impending doom. Recognizing these signs
            early can help you take steps to manage your panic attack
            effectively.
          </p>
        </div>
        <div className={helpStepItemClassName}>
          <h3>Practice Deep Breathing</h3>
          <p>
            Take slow, deep breaths to calm your mind and body. Breathe in
            through your nose for a count of four, hold for a count of four, and
            exhale through your mouth for a count of four. Repeat this several
            times until you feel calmer.
          </p>
        </div>
        <div className={helpStepItemClassName}>
          <h3>Stay Present</h3>
          <p>
            Focus on your surroundings and engage your senses. Describe out loud
            what you see, hear, and feel to help ground yourself in the present
            moment. This can distract your mind from the panic and reduce its
            intensity.
          </p>
        </div>
        <div className={helpStepItemClassName}>
          <h3>Challenge Negative Thoughts</h3>
          <p>
            Remind yourself that the panic attack will pass and that you are not
            in any real danger. Challenge any irrational thoughts by questioning
            their validity and replace them with positive affirmations like "I
            am safe" or "This will pass soon."
          </p>
        </div>
        <div className={helpStepItemClassName}>
          <h3>Use Relaxation Techniques</h3>
          <p>
            Practice progressive muscle relaxation by tensing and then slowly
            relaxing each muscle group. Alternatively, listen to calming music,
            or use guided imagery to visualize a peaceful scene.
          </p>
        </div>
        <div className={helpStepItemClassName}>
          <h3>Maintain a Healthy Lifestyle</h3>
          <p>
            Regular exercise, a balanced diet, and adequate sleep can all
            contribute to overall mental health. Reducing caffeine and alcohol
            intake can also help decrease the frequency and severity of panic
            attacks.
          </p>
        </div>
      </Stack>
    </div>
  );
};

export default DisorderHelp;
