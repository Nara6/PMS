/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { getConfig } from './datasource.config';
console.log(getConfig());

const config = getConfig();
const datasource = new DataSource(config);
async function initializeDataSource() {
    try {
        await datasource.initialize();
        console.log("Initializing");
    } catch (error) {
        console.log('Error: ' + error);
    }
}

initializeDataSource();
export default datasource;
