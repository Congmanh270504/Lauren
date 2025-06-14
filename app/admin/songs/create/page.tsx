import AudioUpload from "@/components/custom/audio-upload";
import Iridescence from "@/components/ui/backgrounds/Iridescence/Iridescence";
import Lightning from "@/components/ui/backgrounds/Lightning/Lightning";
import React from "react";

const Page = () => {
  return (
    <Iridescence
      color={[1, 1, 1]}
      mouseReact={false}
      amplitude={0.1}
      speed={1.0}
    />
  );
};

export default Page;
