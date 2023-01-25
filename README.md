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
- ---
At times we need to fetch and show news about certain elements which are shown in the application or a page. For example, in a CRM application showing a list of accounts, a salesperson might want to keep a check on the latest news about the company.

The control is completely developed using Powerapps Component Framework, and is easy to use and modify. More details on [PowerApps Component Framework]( https://docs.microsoft.com/en-us/powerapps/developer/component-framework/overview)

## Contents

Outline the file contents of the repository. It helps users navigate the codebase, build configuration and any related assets.

| **File/folder**   | **Description**                            |
|-------------------|--------------------------------------------|
| `companynews`     | Directory with PCF code to show news.      |
| `Solutions`       | Directory with the build files for creating the solution zip |
| `bingSampleResponse.json` | Sample json response from the Bing News API |
| `bingwebsearchresponse.json` | Sample json response from Bing Web Search API |
| `.gitignore`      | Define what to ignore at commit time.      |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `README.md`       | This README file.                          |
| `LICENSE`         | The license for the sample.                |

## Prerequisites

- Install **PowerApps Command Line (CLI) Support** - You can download [here](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/get-powerapps-cli)
- Install **Build Tools for Visual Studio** - You can find it [here](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022), **~or~** If you have a full version of Visual Studio installed then you already have it.
- A working installation of **Node.js** and **npm**. This project is based on Node v18.8.2. You can get node [here](https://nodejs.org/en/download/)
- Obtain a **Bing News Search API key** from [Bing Search on Azure Marketplace](https://www.microsoft.com/en-us/bing/apis).  More details on how to do that below. 
 
## Setup

Here is an overview of the steps needed for using the component:
1. Clone the component to a local directory
2. Run `npm install`
3. Update `index.ts` and provide **Bing News API Key** along with **base URL** under `getnews` function
4. Build the code using `npm build run`
5. Execute the component `npm start` 

## Running the sample

For running the code use `npm start`.  The node.js project will compile and automatcially launch a web server and open the PowerApps Component Framework Test Environment. The test environment will have blank fields as defined by your control manifest file. Filling in these values should give your compoent everything it needs to render in the test harness.
- ---
## Using the solution/component with Dynamics 365 CRM

### Add the company news control to the account main form
The steps in this article add the company news control to the account main form already configured to query news topics collected from Bing News. You can use similar steps to add the control to the main form for other entities, such as contact and competitor.

### 1. Get the Bing News API key and URL

The news control requires a Bing Search API endpoint URL and API key. For the News API URL, and API Key, you will need to sign up for the service from Azure Marketplace. More information on the Bing Search API service can be found [here](https://www.microsoft.com/en-us/bing/apis). 
- You can create a new Bing Search service in your Azure account [here](https://aka.ms/bingapisignup). 
- Once created, you will get the API key and API URL under the Keys and Endpoint section. 
- There is a free tier available for this API with a limited number of transactions per month. 
- The same Bing API key covers both Bing News Search and Bing Web Search APIs.
 

### 2. Import the company news solution 

1.	Go to the [releases]() page of this repo.
2.	Download **Solutions,zip**. This file is a managaed solution of the Company News PCF control and can be imported directly into your environment. 
    > **Note:** If you have an older version of the Company News control installed, this solution should offer to upgrade your existing solution as the AppID (in the solution manifest) has been kept the same. Instead of downloading, you may elect to build the component from code instead. More info on how to build and package this solution from source code can be found in the [README.md](/companynews/README.md) file in the `companynews` directory. 
3.	Sign-in to [Power Apps](https://make.powerapps.com), and then in the upper right select the environment where you want to install the Company News control.
4.	Select **Solutions** on the left pane, and then select **Import Solution** on the command bar.
5.	In the Import Solution wizard, select **Choose File**, browse to and select `Solutions.zip`, and then select **Open**. 
6.	Select **Next**. and then select **Next** again to complete the import. 


### 3. Add the control to the Account main form

1.	In Power Apps, select **Solutions** in the left pane, select **Settings (gear)** on the upper right, and then select **Advanced settings**. 
2.	Go to **Settings** > **Customizations** > **Customize the System**. 
3.	In the left navigation tree, expand+ **Entities** > **Account**, select **Forms**, and then open the **Account Main** form.
4.	In the form editor, add two new text fields, which will be used to pass the API key and base URL to the news component. 
    - a.	Select **New Field** from the right navigation Field Explorer. 
    - b.	For both **Display Name** and **Name** enter `newsapikey`. Leave the rest of the settings as the default and then select **Save and Close**.  
    - c.	Repeat the previous two steps to create another text field. For both the **Display Name** and **Name** enter `newsurl`. Leave the rest of the settings as the default and then select **Save and Close**. 
5.	In the form editor, select a place on the form where you want the company news control, and then select **Insert tab** > **Section** > **One Column**. 
6.	To show news by account name, drag and drop the **Account Name** field from the right Field Explorer pane to the newly created section. 
7.	Select the section and then select Change properties. Enter a descriptive section a name, such as `Company News`. You might want to check **"Show the label of this section on the form"** to provide heading to the section. Select **OK**.
8.	Select the newly added **Account Name** field and then select **Change Properties** on the **Home** tab. On the **Field Properties** page, select the **Controls** tab, select **Add Control**, select the `companynews` control, and then select **Add**. 
9.	Configure the following bindings for the `apikey` and `baseurl` fields. 

    - a.	Select **Configure Property** (pencil icon) next to `APIKey`. 
    - b.	From **Bind To** value on a field the dropdown list, select `new_newsapikey (SingleLine.Text)`, and then select **OK**. 
    - c.	Select **Configure Property** (pencil icon) next the `BaseURL`. 
    - d.	From **Bind To** value on a field the dropdown list, select `new_newsurl (SingleLine.Text)`, and then select **OK**.
    - e.	On the **Field Properties** page, select the Web, Phone, and Tablet, client options. 
    - f.	On the **Field Properties** page, select the **Display** tab, clear the `Display Label` on form option, and then select **OK**. 


### 4. To provide `API Key` and `Base URL` default values, use business rules.

In this version of the companynews component the user can switch between **Bing News** and a **Bing Web** search. Both types of searches are available under the same API key, however they have different endpoints. In the `Base URL` field you will need to concatenate both endpoints with a `|` character in between them. 
   1. Select **Business Rules** from the form editor, and then select **New Business Rule** from the bottom of the right pane. 
   2. In the business rule designer, select **Condition** on the designer canvas, set **Field** to `Account Name` and **Operator** to `Contains data`, and then select **Apply**. 
   3. Then, select the **Components** tab, drag a **Set Field Value** action, and provide a field value where **Field** is `newsapikey` and the value is the Key you copied from the Azure Cognitive Services properties. 
   4. Create another **Set Field Value** action where **Field** is `newsurl` and add the value as the Endpoint you copied from the Azure Cognitive Services properties. Make sure to append `/v7.0/news/search` at the end of news URL.
   5. After the Bing News URL type the `|` character. Now append the Bing Websearch endpoint from Azure. The final URL should look similiar to this: 
   ``` 
   https://api.bing.microsoft.com/v7.0/news/search|https://api.bing.microsoft.com/v7.0/search
   ```   
   
   6. Save and Activate the rule. Close the business rule designer. 
   7. Make sure you add the newly created fields, `newsapikey` and `newsurl`, to the Account Form, but mark **Default Visible** as `false`. 
   8. In the form designer, select **Save** and then select **Publish**. 

That's it! The control should render on any Account page. If no results are found for the search the control will display ***No news found***. Please log any issues in the Github issue tracker. 


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
