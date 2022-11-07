function renderContributingSection(confirmContributers, data) {
  if (!confirmContributers) {
    return `
    Thank you for your interest in helping out; however, I will not be accepting contributions from third parties.
      `;
  } else {
    return `
    ${data}
      `;
  }
}

function renderLicenseBadge(license) {
  if (license !== "no license") {
    return `
    ![badge](https://img.shields.io/badge/license-${license}-blue)
      `;
  } else {
    return " ";
  }
}

function renderLicenseLink(license) {
  if (license !== "no license") {
    return `
      [${license}](https://choosealicense.com/licenses/${license})
        `;
  } else {
    return " ";
  }
}

function renderLicenseSection(license) {
  if (license !== "no license") {
    return `
      ## [License](#table-of-contents)
    
      The application is covered under the following license:
    
      ${renderLicenseLink(license)}
        `;
  } else {
    return " ";
  }
}

function renderLicenseTOC(license) {
  if (license !== "no license") {
    return `
    * [License](#license)
      `;
  } else {
    return " ";
  }
}

// generate markdown for README
function generateMarkdown(data) {
  return `
    # ${data.title}
    
    ${renderLicenseBadge(data.license)}
  
    ## Table-of-Contents
  
    * [Description](#description)
    * [Installation](#installation)
    * [Usage](#usage)
    ${renderLicenseTOC(data.license)}
    * [Contributing](#contributing)
    * [Credit](#credit)
    * [Questions](#questions)
    
    ## [Description](#table-of-contents)
  
    ${data.description}
  
  
    ## [Installation](#table-of-contents)
  
    ${data.installation}
  
    ## [Usage](#table-of-contents)
  
    ${data.usage}
    
    For more information on how to add screenshots for examples, visit the following website:
    
    [Mark Down Tutorial](https://agea.github.io/tutorial.md/)
    
    ${renderLicenseSection(data.license)}
  
    ## [Contributing](#table-of-contents)

    ${renderContributingSection(data.confirmContributers, data.contribute)}
    
    ## [Credit](#table-of-contents)
  
    ${data.credit}
  
    ## [Questions](#table-of-contents)
  
    Please contact me using the following links:
  
    [GitHub](https://github.com/${data.githubUsername})
  
    [Email: ${data.email}](mailto:${data.email})
  `;
}

module.exports = generateMarkdown;
