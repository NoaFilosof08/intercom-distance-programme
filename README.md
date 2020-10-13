# Code Test

## Time Frame
1 week

## Technologies userd
- Javascript
- MongoDB
- Node.js
- Express
- Insomnia
- GitHub
- npm

## Brief
The brief was the calculate the distance between the Dublin Office (co-ordinates given in the brief) and each user on the given list. Once this was calculated, I had to determine which users were within 100km of the Dublin office, and produce those users in a list. This list is to be in ascending order by User ID.

## Process
First I wanted to make myself familiar with the equation. I looked at the linked Wikipedia articla and broke the equation down into four steps
  1) Convert the degrees into radians
  2) Calculate the absolute difference between the longitudes and latutudes (Dublin office long/lat - user long/lat)
  3) Calculate the Central angle using the formula
  4) Calculate the arc length by doing r (earth's radius) x central angle
I first tested this formula worked with the data I was given and checked it in this converter: https://www.movable-type.co.uk/scripts/latlong.html

Once I was happy with my understanding of the Maths, I went ahead and built a basic MongoDB, Express and Node.js app. This app contains:
- User Schema; this is where my data is model and acts as the 'blue print' of the data - can be found in 'models/userData.js'
- Seeds; this is where I create the data itself from my 'data' file - this data file is the JSON list given in the brief - seeds can be found in 'db/seeds.js' and data itself can be found in: 'db/data/userData.js'
- Controller; this is where I perform all the functions/formulae/requests - can be found in 'controllers/userData.js'
- Router; here is where I provide a route for my requests - can be found in 'config/router.js'

Next, I needed to 'translate' the forumla into JavaScript to make sure it worked. I used a few sample data points form the list given to test that it worked. Again, I tested this against the converter linked above.

Then the big task: writing the requests. I wrote 3 requests. 2 Get and 1 Delete (I will explain the delete later on).
- The first get request is to simply get the list of all the user data.
The second get request gets performs the formula:
- First; it gets all the user data,
- Second; it creates a new empty array for new users
- Third; it performs a function FOR EACh of the users in the user data:
    - This function is the equation to calculate the distance between the dublin office, and the co-ordinates for each user.
    - The For Each also performs a conversion, which converts the arc length into KM.
    - This also checks whether the distance calculated is less than or equal to 100km. If it is less than 100km, it then produces a new object with the User ID, the distance, and the User's name.
    - Then, it pushes this new object onto the empty array created earlier on for new users.
- Fourth; the new user array is sorted in ascending order
- Fifth; if all goes well, the new user array is then returned as JSON in the response.

## Running the programme
/ please run all commands at the project root /
Upon install run `npm install` --> this should install mongoDB/express
(if you have not installed mongoDB before please run the following commands:
  1) `sudo mkdir -p ~/data/db`,
  2) `sudo chown -R $(whoami) ~/data/db`,
  3) `mongod --dbpath ~/data/db`
)
Then run `npm run seed` --> this will create the initial data set
Attached you will see an Insomnia.JSON file. I tested all my requests in Insomnia. Here you will be able to copy and paste the file and drop it into Insomnia.

To run the programme please run `npm run start` and run the first get request. Test this in Insomnia, under the 'GET ALL USERS' REQUEST. There should already be a URL in the nav bar, if not, copy and paste in this URL 'localhost:4000/users/' and press 'Send'. This should produce the full list of users.
(If there is a user at the top of the list which contains only an "_id" and "_v" (as oppposed to "_id", "latitude", "user_id", "name", "longitude", "__v") please perform the following:
  Copy the "id" of this user (the user containing only and "id" and "_v"). Then navigate to the delete request and replace the end of the URL with the content of the id, so the URL bar should look like this: 'localhost:4000/allusers/5f804d1cdcc06639a4750fac'. Go back to the GET ALL USERS request and hit send again, the same list should be returned, simply without this additional user+.
)

Next we can perform the formula. Navigate to the 'GET ALL USERS AND PERFORM EQUATION' request. In the nav bar the URL should look like this: 'localhost:4000/allusers/', if not then copy that in. This will perform the equation, and also return the list of the users within 100km in ascending order.

## Challenges
- Test: I'm not so familiar with building and running tests, so I decided to test it externally, specifically the equations.
- Deciding what requests to run.
- Coming to grips with the formula and 'translating' it into JavaScript.
- Refactoring my code down into seperate functions; when I did this it messed with my reqests so I decided to leave it all in one place!

## My Proudest Achievement

/ + MongoDB attaches an ID to each item Object in an array, when it does this it sometimes creates an additional plain one. This made it difficult to perform my function and formulas, so I decided the best way around this was to delete it.
