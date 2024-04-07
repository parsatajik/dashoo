import { useEffect, useState } from "react";
import { useNeurosity } from "../contexts/NeurosityContext";

const CalmPage = () => {
  const { neurosity } = useNeurosity();
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!neurosity) {
      return;
    }

    const subscription = neurosity.calm().subscribe((calm) => {
      console.log("Calm data:", calm);
      setCalm(Number(calm.probability.toFixed(2)));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [neurosity]);

  // Function to determine the background color based on the calm value
  const getBackgroundColor = (calmValue) => {
    // Example: Interpolate between red (0% calm) and green (100% calm)
    const calmPercentage = calmValue * 100;
    const red = Math.floor(255 * (1 - calmPercentage / 100));
    const green = Math.floor(255 * (calmPercentage / 100));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div
      className="flex flex-col h-full w-full"
      style={{ backgroundColor: getBackgroundColor(calm) }}
    >
      <h1 className="text-xl font-bold mb-4">Calm Page</h1>
      <div
        className="radial-progress mx-auto text-primary"
        style={{
          "--value": (calm * 100).toString(),
          "--size": "12rem",
          "--thickness": "2rem",
        }}
        role="progressbar"
      >
        {(calm * 100).toFixed(0)}%
      </div>
    </div>
  );
};

export default CalmPage;
