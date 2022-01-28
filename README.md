# text_analytics_FE
Text analysis

# Usage

## Run local

### 1. Clone this repo

```bash
git clone https://github.com/vobalz/text_analytics_FE.git
cd text_analytics_FE
```

### 2. Install Javascript packages

```bash
# It will take few minutes to install
npm install
```

### 3. Run React.js

```bash
# Run React.js server in development mode with default port 3000
npm start
# or
yarn start
```

### 4. Open in browser

https://localhost:3000

---
## To Add a new page

1. Copy and rename [template](src/pages/template) folder in [src/pages](src/pages)
    ```bash
    - src
        -- pages
            --- ...
            --- "new_page" // Rename the folder
                --- "new_page.js" // Rename the file
                --- "package.json" // Keep the filename
    ```
2. Rename the Class name in the new folder
    ```javascript
    // Rename Line 3 and 15
    class YOUR_CLASS_NAME extends React.Component {
    // ...
    export default YOUR_CLASS_NAME;
    ```
3. Edit the `package.json` file in the new folder
    ```json
    {"name": "Template", // Name of the package
    // ...
    "main": "new_page.js", // Your filename
    }
    ```
4. Import the new page folder into [src/components/Layout/Layout.js](src/components/Layout/Layout.js)
    ```javascript
    // ...
    import YOUR_CLASS_NAME from '../../pages/new_page'; // Edit the path to your new page
    // ...
    // Add Route inside <Switch> tag
    <Switch>
    // ...
        <Route path="/app/new_page" exact component={YOUR_CLASS_NAME} />
    </Switch>
    ```
5. Run the React server and browse

    [localhost:3000/#/app/new_page](localhost:3000/#/app/new_page)

6. To add a button to redirect to the new page, add the following code in [src/components/Layout/Layout.js](src/components/Layout/Layout.js)
    ```javascript
    // ...
    import YOUR_CLASS_NAME from '../../pages/new_page'; // Edit the path to your new page
    // ...
    // Add LinksGroup inside <ul className={s.nav}>
    <ul className={s.nav}>
        // ...
        <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="YOUR_DISPLAY_NAME" 
            isHeader
            iconName={...} // List of icons can be found in components/Icons
            link="/app/YOUR_PAGE_PATH" 
            index="YOUR_PAGE_INDEX"
        />
    </ul>
    ```
