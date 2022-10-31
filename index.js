// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");
const fs = require("fs");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "enter your project title",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("please enter project title");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "username",
    message: "enter github username",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("please enter username");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "enter your email",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("please enter email");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "what",
    message: "what problem does your project solve?",
    validate: (whatInput) => {
      if (whatInput) {
        return true;
      } else {
        console.log("please describe what your project is");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "why",
    message: "Why did you create this project? (Required)",
    validate: (whyInput) => {
      if (whyInput) {
        return true;
      } else {
        console.log("Please enter why you created this project!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "how",
    message: "how will your project solve this problem",
    validate: (howInput) => {
      if (howInput) {
        return true;
      } else {
        console.log("please describe how your project works");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "installation",
    message: "please provide installation instructions",
    validate: (installInput) => {
      if (installInput) {
        return true;
      } else {
        console.log("please provide installation instructions");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "usage",
    message: "Please provide instructions and examples for use. (Required)",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log("Please enter your use instructions!");
        return false;
      }
    },
  },
  {
    type: "list",
    name: "license",
    message: "Which license will you use for your project?",
    choices: ["agpl", "apache", "mit", "no license"],
  },
  {
    type: "confirm",
    name: "confirmContributers",
    message: "Would you like to allow other developers to contribute?",
    default: true,
  },
  {
    type: "input",
    name: "contribute",
    message: "Please provide guidelines for contributing. (Required)",
    when: ({ confirmContributers }) => {
      if (confirmContributers) {
        return true;
      } else {
        return false;
      }
    },
    validate: (contributerInput) => {
      if (contributerInput) {
        return true;
      } else {
        console.log("Please enter contributer guidelines!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "test",
    message: "Please provide instructions on how to test the app. (Required)",
    validate: (testInput) => {
      if (testInput) {
        return true;
      } else {
        console.log("Please enter your use test instructions!");
        return false;
      }
    },
  },
];

// TODO: Create a function to write README file
function writeFile(fileContent) {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/generated-README.md", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "File created!",
      });
    });
  });
}

// function to prompt questions and store user inputs
const init = () => {
  return inquirer.prompt(questions).then((readmeData) => {
    return readmeData;
  });
};

// Function call to initialize app
init()
  .then((readmeData) => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
  })
  .then((pageMD) => {
    return writeFile(pageMD);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse.message);
  })
  .catch((err) => {
    console.log(err);
  });
