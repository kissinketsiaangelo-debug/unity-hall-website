import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'demo',
    dataset: 'production',
  },
  studioHost: 'unity-hall-knust',
});