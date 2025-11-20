#DEV - TINDER

-Created a Vite  + React applictions 
-Remove unecessary code and create a hello World app
-Install tailWind frameWorks 
-Install Daisy UI
-Add NavBar Component to App.jsx
-Create a Navbar.jsx separate Component File
-Install react router dom 
-Create BrowserRouter > Routes > Route =/ Body 
-Create a footer 

-create the login page 
-axios call
-CORS - install cors in backend ==> add in middleware to with configurations : origin, creadentials : true;
-When ever you make and api call so pass ==> {withCredentials : true};
-Install redux toolkit 
-instal react redux 
-create store , configureStore then =>  Provider to app then => createSlice and the methods {addUser, RemoveUser}, => add reducer to store.
- Refoactor our code to add constants file + create a components folder 
-You Should not be access other route without login
-If token is not present, redirect user to login page 
-logout 
-Profile
-Get the feed and add the feed in the store 
-build the user card on feed  
-Edit Profile Feature
-Show Toast Message on save of profile
-New Page -See all my connections.
-New Page - See all the Connections Requests.

Remaining:
-Send/ignore the user card from feed 
-SignUp New User
-E2ETesting

-Edit the login from 
   -ADD the input of firstName , LastName and store the value with the help of useState 
   -Than toggle the button and UI of the input Field.
    
# Deployment

- Signup on AWS 
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend    
    - npm install  -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance
- Backend
    - updated DB password
    - allowed ec2 instance public IP on mongodb server
    - npm intsall pm2 -g
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"    


        Frontend = http://43.204.96.49/
    Backend = http://43.204.96.49:7777/

    Domain name = devtinder.com => 43.204.96.49

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api

    nginx config : 

    server_name 43.204.96.49;

    location /api/ {
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }