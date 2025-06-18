import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARJECT_KEY } from "./env.js";

const aj = arcjet({
  key: ARJECT_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", // Using DRY_RUN mode for testing
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:BROWSER",
        "CATEGORY:MONITORING",
        "CATEGORY:TESTING",
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 2, // Reduced: Refill 2 tokens per interval
      interval: 30, // Increased: Refill every 30 seconds
      capacity: 3, // Reduced: Bucket capacity of 3 tokens
    }),
  ],
});

export default aj;
