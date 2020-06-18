# chartjs-datastream-siem
Simple client-server app consuming data from Akamai DataStream and Akamai SIEM Integration and showing it using Chart.js

Usage:

1. Clone de repository (git clone https://github.com/angelnogueras/chartjs-datastream-siem.git)

2. cd chartjs-datastream-siem

3. npm install

4. Create ".env" file with content like:

	> 	SECTION\_DS=\<.edgerc section name with credentials valid to access DataStream\>
> 
> 	STREAM\_AGG\_ID=\<datastream stream id\>
> 
> 	STREAM\_WINDOW\_HOURS=\<number of hours of data you want to collect\>
> 
> 	SECTION\_SI=\<.edgerc section name with credentials valid to access SIEM Integration\>
> 
> 	SIEM\_CFG\_ID=\<SIEM Integration configuration ID\>
> 
> 	SIEM\_HOURS=\<number of hours of data you want to collect\>

	Take a look at Authorization ([https://developer.akamai.com/introduction/Prov_Creds.html](https://developer.akamai.com/introduction/Prov_Creds.html)) and Credentials ([https://developer.akamai.com/introduction/Conf_Client.html](https://developer.akamai.com/introduction/Prov_Creds.html)) sections in Akamai CLI Getting Started guide.

5. Start the server:
  npm start (run the server in production mode)
  -or-
  npm run watch (nodemon run)

6. Server runs on port 3000 (but you can change it in server.js). A browser window/tab will be opened automatically.

7. You have a button to update the graph and a check to enable automatic update.
  

