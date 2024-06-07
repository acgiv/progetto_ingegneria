module.exports = ({ env }) => ({
  // altre configurazioni dei plugin
  plugins: {
    // altre configurazioni dei plugin
    "models-relation-diagram": {
      enabled: true,
      config: {
        defaultExcludeAdmin: true,
        defaultHideUpload: true,
        defaultExcludeComponents: false,
        defaultLayout: 'dagre',
        defaultEdgesType: 'step',
        hideMarkers: true,
      }
    },
    // altre configurazioni dei plugin
  },
});