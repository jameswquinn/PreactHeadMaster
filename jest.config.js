{
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"],
  "moduleFileExtensions": ["js", "jsx"],
  "testPathIgnorePatterns": ["/node_modules/", "/dist/"],
  "collectCoverageFrom": ["src/**/*.{js,jsx}"],
  "rootDir": "src"
}
