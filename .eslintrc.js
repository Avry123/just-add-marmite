module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:next/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off"
    },
    "settings": {
      "react" : {
          "version": 'detect'
      }
    }
}
