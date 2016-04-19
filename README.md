# LewisDaily


##Description
Auto displays a new quote daily 

##Brief overview

###Data
* There are 2 collections - the repository and current.
* Populate the repo manually or through the user interface at http://[site]/addQuote

###Daily job
* App looks at current DB and untags the quote tagged as 'current'
* App looks at repo and selects an unused quote and moves it over to the current DB. This quote is tagged as 'used' in repo and as 'current' in current DB. 
* App knows to display new quote by looking for quote tagged 'current'

###Stack
Backbone, Mongo, Mongoose, Node, Express, Jade


