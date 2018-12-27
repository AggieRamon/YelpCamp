RESTFUL ROUTES

name    url             verb    description                                         Mongoose Method
===================================================================================================================================
INDEX   /dogs           GET     List all dogs                                       Dog.find()
NEW     /dogs/new       GET     Show new dog form                                   N/A
CREATE  /dogs           POST    Create a new dog, then redirect somewhere           Dog.create()
SHOW    /dogs/:id       GET     Shows info about one specific dog                   Dog.findById()
Edit    /dogs/:id/edit  GET     Show edit form for one dog                          Dog.findById()
Update  /dogs/:id       PUT     Update a particular dog, then redirect somewhere    Dog.findByIdAndUpdate
Destroy /dogs/:id       DELETE  Delete a particular dog, then redirect somewhere    Dog.findByIdAndDelete