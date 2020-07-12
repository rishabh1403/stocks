# Stocks App

## Libraries used
- React
- Material UI
- Moment
- React Sparklines

## Live Demo
http://stocks-proximity.s3-website.ap-south-1.amazonaws.com/

## Failed deployment on github pages

The websocket is using unsecured protocol, however the frontend was deployed on a secured server(Github in this case). So, the initial files were loaded over https and later on there was an attempt to coonect to a unsecured server i.e. websocket. This throws a mixed content error and a lot of browsers block this to ensure the data is safe. 

We can solve this via either deploying the frontend on http instead of https. Also, we can create a server which is secured by SSL. Our frontend will talk to the server and server will in turn talk o the websockets. Once a message is recieved on server, it can process the data to check for any malicious content and then forward the data to frontend.