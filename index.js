// packages
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");
const fs = require("fs");

// questions array
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
    name: "description",
    message:
      "Describe your project, what is it, how does it work, why did you build it?",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log("please describe your project");
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
        console.log("Please enter usage examples");
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
    name: "credit",
    message: "Please provide instructions on how to test the app. (Required)",
    validate: (creditInput) => {
      if (creditInput) {
        return true;
      } else {
        console.log("Please enter repository info");
        return false;
      }
    },
  },
];

// prompt questions and store user inputs
const init = () => {
  return inquirer.prompt(questions).then((readmeData) => {
    return readmeData;
  });
};

// write README file
function writeFile(fileContent) {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/your-README.md", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "Readme generated",
      });
    });
  });
}

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
