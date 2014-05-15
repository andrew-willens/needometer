Welcome to the Needometer
=================

The Needometer is a database interface for opendata at [donorschoose.org](http://data.donorschose.org), allowing users to explore relationships within 13 years of historic data on projects posted on the site since the organization's inception. Check out the [live demo](http://needometer.fullstackacademy.com) of the most recent iteration!

##Specs:
- Stack: MongoDB, Express.js, Node.js, jQuery.js
- Dependencies:
  + [Mongoose](http://mongoosejs.com/index.html) - Object Relational Mapper.
  + [D3.js](http://d3js.org/) and [Topojson](https://github.com/mbostock/topojson/wiki) - data visualization library and
      geographic data formatting tool.
  + [Bootstrap](http://getbootstrap.com/) and [Fontawesome](http://fortawesome.github.io/Font-Awesome/) - frontend
      CSS/HTML/JS framework.
  + [AMCharts](http://www.amcharts.com/javascript-charts/) - Javascript charts library.
  + [Swig](http://paularmstrong.github.io/swig/) - JavaScript templating engine. (For html-embedded javascript.)
  + [Bower](http://bower.io/) - frontend package manager.
  + [Git](https://github.com/) - version control.

###To install this application on your own machine:
**If you're on a Mac, I highly recommend [installing Homebrew](http://brew.sh/) before jumping in - it makes installing all of these components a lot easier.**


####Setting Up Your Stack
1. Install Node.js - [Node official site](http://nodejs.org/download/), [howtonode.org](http://howtonode.org/how-to-install-nodejs), or, if you've installed Homebrew, run the following on your command line:

    >$ brew install node


2. Install npm (i.e., the node package manager), which is what you'll use to install all of this application's dependencies.
From [howtonode.org](http://howtonode.org/introduction-to-npm):

    > $ curl http://npmjs.org/install.sh | sh


3. [Install MongoDB](http://docs.mongodb.org/manual/installation/).


4. Install Express.js from the command line with npm. The command:

    > $ npm install -g express

    (-g directs npm to install express.js globally on your machine, so it's available for use in any project, in any directory.)

5. [Install Bower](http://bower.io/) (globally):

    > $ npm install -g bower


6. [Install Git](http://git-scm.com/book/en/Getting-Started-Installing-Git).



####Installing the Needometer.

1. Clone this repository into a directory of your choice:

    > $ git clone https://github.com/andrew-willens/needometer.git

2. Install the server- and client-side dependencies:

    > $ npm install
    >
    > $ bower install

     (Make sure you run these commands from the Needometer root directory.)

3. Download the data you'll need to fuel this application: https://s3.amazonaws.com/open_data/csv/opendata_projects.zip. Put this in a directory outside of the application directory, as it's a heavy file and you won't need to access it directly.

4. Seed your local MongoDB with the data from the file you just downloaded. From the directory in which you downloaded the above csv file, run:

    > $ mongoimport --db needometer --collection projects --type csv --headerline --file opendata_projects.csv


####Running the Needometer.

1. Start mongo:

    > $ mongod

    (You'll want to do this in a separate terminal instance, i.e. window or tab.)

2. From the root directory of the application, run:

    > $ node server.js

    Your console should read:

    > $ Express server listening on port 8000

3. Open a browser and visit localhost:8000. Enjoy!
