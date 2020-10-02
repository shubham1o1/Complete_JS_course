# NPM Tutorials

ref: https://www.youtube.com/watch?v=r0CJwuCP2ck&list=PLC3y8-rFHvwhgWwm5J3KqzX47n7dwWNrq&index=5

- Package manager
- Package - reusable code
- Needs nodejs from nodejs.org

### Package.json
- Dependencies and Scripts
- ```npm init``` creates these files with few questions.
- `npm init --yes` creates with default value without questions.

### Default values:

- `npm config set init-author-name "Shubham"` to set the default author name
- `npm set licence "MIT"` to set default licence. 
- These default values will be set when `npm init --yes` is executed.
- To read the set default value : `npm config get init-author-name`
- Deleting default value: `npm config delete init-author-name`

### Installing local package:

- `npm install moment` in the computer
- `npm install moment --save` in the project and entry on **package.json** in dependencies keyword.
- Installing packages for Development purposes only: `npm install lodash --save-dev`, devDependencies entry in package.json

### Uninstalling and removing from entry:
- `npm uninstall moment --save` - remove from dependencies
- `npm uninstall moment --save-dev` - remove from dev dependencies

### Install/uninstalling globally:

- `npm install moment -g`
- `npm uninstall moment -g` - remove, rm, un = unistall 

### Listing packages

- `npm list` - packages and their dependencies are listed
- `npm list --depth 1` - packages and their 1 level dependencies are listed
- `npm list --depth 0` - only packages are listed.

- global packages list : `npm list --global true --depth 0`

### npm versioning:

- `npm install <package>` install the LTS of the package
- **^4.16.1** -> 4 is major version number, 16 is minor version number and 1 is patch version number
- Bug fix/performance increase -> patch no increase
- Feature addition without breaking current functionality -> minor version increases 
- Feature addition that breaks current functionalities -> major version increases 
- Installing specific version:

- `npm install loadash@3.3.0` - use the @ symbol
- `npm install loadash @4.14 --save` - latest patch version is installed for given version



