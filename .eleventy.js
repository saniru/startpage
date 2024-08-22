const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy("index.css");
  eleventyConfig.addPassthroughCopy("index.js");
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
  js = eleventyConfig.javascriptFunctions;
};
