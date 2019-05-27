# DJ Watson

Clone the repo with

````
git clone https://github.com/Teddarific/djwatson.git
````

## Client

Change into the client directory,

````
cd client
````

Install all dependencies,

````
yarn
````

To run the client,

````
yarn start
````

The site should now be hosted at localhost:8080

## Server

Change into the server directory,

````
cd server
````

Install all dependencies,

````
yarn
````

To run the server,

````
yarn dev
````

The API should now be hosted at localhost:9090

## Data

To create new environment,

````
virtualenv -p python3 env
````

To activate environment,

````
source env/bin/activate
````

To deactivate environment,

````
deactive
````

To install all dependencies,

````
pip install -r requirements.txt
````

## Training the Net

@Teddy, we need to include the code to get the .csv file.

Label the first column of the .csv file "PAIR_WORKS." Label the rest of the columns "FEATURE 1," FEATURE 2, "FEATURE 3," etc.

Take the .csv and convert it to a JSON using <http://www.convertcsv.com/csv-to-json.htm>. Take this file, and paste it into a text file named `training.json`. Place this file into the `train` directory. Run `parseJson.py`. There should now be a file called  `new_training.json`. Use this JSON as `trainingData` in `training-data.js`. 

From the `train` directory, run `python -m SimpleHTTPServer 9000`. Visit <http://localhost:9000> on Chrome and inspect the page using Chrome Dev Tools. 

Wait for the net to change. It will output a JSON string in the console. Copy and paste this in `server/app/trainedNet.json`. 

Congrats, you've successfully retrained your model.
