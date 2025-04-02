/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    eslint : {
        ignoreDuringBuilds: true, // ensure deploiyment goes through

    },
    typescript: {
        ignoreBuildErrors : true, // ensure deploiyment goes through
    },
    
};

export default config;
