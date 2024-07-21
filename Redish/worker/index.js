const { createClient } = require("redis");

const redisClient = createClient();

const main = async () => {
  try {
    redisClient.connect();
    redisClient.on("error", (err) => console.log("Error occured", err));

    while (true) {
      const response = await redisClient.brPop("users", 0);
      console.log(response);
    //   await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  } catch (err) {
    console.log("Worker failed", err);
  }
};

main();
