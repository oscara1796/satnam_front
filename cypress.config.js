const { defineConfig } = require('cypress')
const { exec } = require('child_process')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    isolation: false,
    env: {
      credentials: {
        username: 'user@example.com',
        password: 'pAssw0rd',
      },
      admin_credentials: {
        username: 'oscar@example.com',
        password: 'adminpassword',
      },
    },
    setupNodeEvents(on, config) {
      // Define custom task for executing CLI commands
      on('task', {
        execCommand(cmd) {
          return new Promise((resolve, reject) => {
            exec(cmd, (error, stdout, stderr) => {
              if (error) {
                reject(error)
              } else {
                resolve({ stdout, stderr })
              }
            })
          })
        },
        // Other tasks can be defined here
      })

      // Any other event listener setups can go here
    },
  },
})
