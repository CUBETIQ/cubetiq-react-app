const path = require('path')
const webpack = require('webpack')
const npmPackage = require('./package.json')
const { v4: uuidv4 } = require('uuid')
const { execSync } = require('child_process')

// Get the last commit id/log
const gitFetchCommitIdCommand = 'git rev-parse HEAD'

// Execute the command
const fetchGitCommitId = () => {
    try {
        return execSync(gitFetchCommitIdCommand).toString().trim()
    } catch (e) {
        console.error(e)
        return '-1'
    }
}

// get current date (build date time)
const today = new Date()

// get date as version suffix: 10112021
const dateVersion = `${today.getDay()}${today.getMonth()}${today.getFullYear()}`

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        plugins: {
            add: [
                new webpack.DefinePlugin({
                    'process.env.PACKAGE_NAME': `"${npmPackage.name}"`,
                    'process.env.PACKAGE_VERSION': `"${dateVersion}"`,
                    'process.env.BUILD_NUMBER': `"${uuidv4()}"`,
                    'process.env.BUILD_DATE': `"${today.toLocaleString()}"`,
                    'process.env.COMMIT_ID': `"${fetchGitCommitId()}"`,
                }),
            ],
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^@(.*)$': '<rootDir>/src$1',
            },
        },
    },
}
