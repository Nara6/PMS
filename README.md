# Project Management System
## API

### Installation && Set up
below command for install node package
```bash
npm install
```
To Migrate && Seed the data to Database(PostgreSQL)
```bash
npm typeorm:run-migrations
```
To run the project
```bash
npm run start:dev
```
## Web

### Installation && Set up
below command for install node package
```bash
npm install
```
In order to run project, you need to configure environment first. Configure to desire your API
This is the example.
```python
export const environment = {

    production: true,
    apiUrl      : 'https://api.pms.yinsoknara.site/api',
    fileUrl     : 'https://file.pms.yinsoknara.site/'

};
```
To serve the project
```bash
ng serve
```
## File

### Installation && Set up
below command for install node package
```bash
npm install
```
### Migrate && Seed Data
Migrate all tables
```bash
npm run migrate
```
Seed data to tables
```bash 
npm run seed
```
To start the project
```bash
npm run start:dev
```
