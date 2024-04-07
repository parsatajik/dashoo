const { Neurosity } = require("@neurosity/sdk");

const neurosity = new Neurosity({
  timesync: true,
});

main();

async function main() {
  try {
    await neurosity.login({
      email: "parsa1379.tajik@gmail.com",
      password: "test123",
    });

    const metric = "kinesis";
    const label = "letterA";

    const trainingOptions = {
      metric,
      label,
      experimentId: "-experiment-1-a",
    };

    // Subscribe to Kinesis
    neurosity.kinesis(label).subscribe((kinesis) => {
      console.log("leftArm kinesis detection", kinesis);
    });

    // Subscribe to raw predictions
    neurosity.predictions(label).subscribe((prediction) => {
      console.log("leftArm prediction", prediction);
    });

    // Tell the user to clear their mind
    console.log("Clear you mind and relax");

    // Tag baseline after a couple seconds
    setTimeout(() => {
      // Note: using the spread operator to bring all properties from trainingOptions into the current object plus adding the new baseline tag. Learn about spread operators here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      neurosity.training.record({
        ...trainingOptions,
        baseline: true,
      });

      // Now tell the user to imagine an active thought
      console.log("Imagine ants walking up your arm.");
    }, 4000);

    // Tell the user to imagine active thought and fit
    setTimeout(() => {
      // Note: You must call fit after a baseline and an active have been recorded.
      neurosity.training.record({
        ...trainingOptions,
        fit: true,
      });
    }, 8000);
  } catch (error) {
    console.log("error", error);
  }
}
