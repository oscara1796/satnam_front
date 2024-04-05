module.exports = {
    presets: [
      // Add your other presets here. For example, if you're using React:
      '@babel/preset-react',
      // Don't forget the preset for JavaScript
      '@babel/preset-env',
    ],
    plugins: [
      // Add your other plugins here
      // Here are the plugins you're specifically adding for private properties and methods support
      require('@babel/plugin-proposal-private-property-in-object').default,
      require('@babel/plugin-proposal-private-methods').default,
    ],
  };
  