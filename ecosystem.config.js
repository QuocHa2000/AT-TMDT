const REPO = "git@github.com:QuocHa2000/AT-TMDT.git";
module.exports = {
  apps: [
    {
      name: "AT_TMDTs",
      script: "node ./dist/app.js",
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "18.163.166.211",
      ref: "origin/master",
      repo: REPO,
      ssh_options: "StrictHostKeyChecking=no",
      path: "/root/home/azureserver/mobile-server/",
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart /home/ubuntu/mobile-server/ecosystem.config.js && pm2 save",
    },
  },
};
