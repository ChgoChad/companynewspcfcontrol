---
page_type: 
 CompanyNews Component Description
languages:
 typescript, react-native fluent-ui
products:
 PowerApps Component Framework 
 (Refactored for new Virtual PCF) 
description: 
 "The plugin provides News feature, by default getting news for a text from BING news, but can be customized for other news sources."
---

# CompanyNews Component (Refactored for Virtual PCFs)
## Refeactored and Updated 2023 

This project was originally a Microsoft sample provided with the Dynamics 365 SDK. It has been refactored a couple of times through the years, however there were still a few areas where the design fell short making it not viable for use in a production Dynamics 365 environmeent--so I set out to change that. 

**This version of the Company News PCF component has the following updates from the previous version:**
- It's been Refactored to take advantage of the new **virtual** PCF code components (Learn more about virtual React and Fluent-UI code components [here](https://powerapps.microsoft.com/en-us/blog/virtual-code-components-for-power-apps-using-react-and-fluent-ui-react-platform-libraries/))
- Completely **React and Fluent-UI native** in a Dynamics or Power Platform Environment (it uses the React and Fluent-UI provided by the environment and does not load its own copy of the framework)
- Several styling updates to improve the overall appearance of the control
- The Bing News search API originally included does not always return relevant results, so I added the ability to use a regular Bing web search instead of a Bing News search. The search that is used is determined by a toggle button in the main UI of the control allowing the user to switch search sources on the fly. 
 
At times we need to fetch and show news about certain elements which are shown in the application or a page. For example, in a CRM application showing a list of accounts, a salesperson might want to keep a check on the latest news about the company.

The control is completely developed using Powerapps Component Framework, and is easy to use and modify. More details on [PowerApps Component Framework]( https://docs.microsoft.com/en-us/powerapps/developer/component-framework/overview)

## Contents

Outline the file contents of the repository. It helps users navigate the codebase, build configuration and any related assets.

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `companynews`     | PCF code to show news.                     |
| `.gitignore`      | Define what to ignore at commit time.      |
| `CHANGELOG.md`    | List of changes to the sample.             |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `README.md`       | This README file.                          |
| `LICENSE`         | The license for the sample.                |

## Prerequisites

Install Powerapps command line support - https://docs.microsoft.com/en-us/powerapps/developer/component-framework/get-powerapps-cli
 
## Setup

Here is a step by step guide for using the component
1. Clone the component to a local directory
2. Run npm install
3. Update index.ts and provide Bind news id along with base url under getnews function
4. Build the code using- npm build run
5. Execute the component - npm start 

## Running the sample

For running the code - npm start

## Using the plugin with Dynamics 365 CRM

Add the company news control to the account main form
The steps in this article add the company news control to the account main form already configured to query news topics collected from Bing News. You can use similar steps to add the control to the main form for other entities, such as contact and competitor.
Get the Bing News API key and URL
The news control requires a news API URL, API key, and more news URL. For Bing News, the more news URL is preconfigured in the control to use https://www.bing.com/news/search. For the News API URL, and API Key, you’ll need to provide these by creating a Cognitive Service component under your Azure account. Once created, you will get the API key and API URL under the Keys and Endpoint section.  
 
Import the company news solution 
1.	Go to the following GitHub repo. https://github.com/microsoft/companynewspcfcontrol
2.	Download Solutions,zip. To do this, open the Solutions folder, open Solutions.zip, and then select Download. 
3.	Sign-in to Power Apps, and then in the upper right select the environment where you want to install the company news control.
4.	Select Solutions on the left pane, and then select Import on the command bar. 
5.	In the Import solution wizard, select Choose File, browse to and select Solutions.zip, and then select Open. 
6.	Select Next, and then select Next again to complete the import. 
Add the control to the account main form
1.	In Power Apps, select Solutions on the left pane, select Settings (gear) on the upper right, and then select Advanced settings. 
2.	Go to Settings > Customizations > Customize the System. 
3.	In the left navigation tree, expand Entities > Account, select Forms, and then open the Account Main form.
4.	In the form editor, add two new text fields, which will be used to pass the key and base URL to the news component. 
a.	Select New Field from the right navigation Field Explorer. 
b.	For both Display name and Name enter newsapikey. Leave the rest of the settings as the default and then select Save and Close.  
c.	Repeat the previous two steps to create another text field. For both the Display name and Name enter newsurl. Leave the rest of the settings as the default and then select Save and Close. 
5.	In the form editor, select a place on the form where you want the company news control, and then select Insert tab > Section > One Column. 
6.	To show news by account name, drag and drop the Account Name field from the right Field Explorer pane to the newly created section. 
7.	Select the section and then select Change properties. Enter a descriptive section a Name, such as Company news. You might want to check “Show the label of this section on the form” to provide heading to the section. Select OK.
8.	Select the newly added Account Name field and then select Change properties on the Home tab. On the Field Properties page, select the Controls tab, select Add Control, select the companynews control, and then select Add. 
9.	Configure the following bindings for the apikey and baseurl fields. 
a.	Select Configure property (pencil icon) next to APIKey. 
b.	From Bind to value on a field the dropdown list, select new_newsapikey (SingleLine.Text), and then select OK. 
c.	Select Configure property (pencil icon) next the BaseURL. 
d.	From Bind to value on a field the dropdown list, select new_newsurl (SingleLine.Text), and then select OK.
e.	On the Field Properties page, select the Web, Phone, and Tablet, client options. 
f.	On the Field Properties page, select the Display tab, clear the Display label on form option, and then select OK. 
10.	To provide API Key and Base URL default values, use business rules. Select Business Rules from the form editor, and then select New Business Rule from the bottom of the right pane. 
11.	In the business rule designer, select Condition on the designer canvas, set Field to Account Name and Operator to Contains data, and then select Apply. Then, select the Components tab, drag a Set Field Value action, and provide a field value where Field is newsapikey and the value is the Key you copied from the Azure Cognitive Services properties. Create another Set Field Value action where Field is newsurl and add the value as the Endpoint you copied from the Azure Cognitive Services properties. Make sure to append “bing/v7.0/news/search” at the end of news URL. Final URLshould look like https://<<yourservicename>>.cognitiveservices.azure.com/bing/v7.0/news/search   
12.	Save and Activate the rule. Close the business rule designer. 
13.	Make sure you add the newly added fields, newsapikey and newsurl, to Account Form, but mark default visible as false. 
14.	In the form designer, select Save and then select Publish. 

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
