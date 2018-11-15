const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserStory = new Schema({
    subject: String,
    title: String,
    userStory: String
});

const Actor = new Schema({
    name: String,
    description: String,
    userStoreis: [UserStory]
});

const Subject = new Schema({
    name: String,
    description: String
})

const Task = new Schema({
    taskName : String,
    days : Number
});

const TaskContaner = new Schema({
    containerName: String,
    days : Number,
    price : {type: String, default: ''},
    tasks: [Task]
})

const Process = new Schema({
    milestoneName : String,
    comment : {type: String, default: ''},
    processTotalPrice :  {type: Number, default: 0},
    containers : [TaskContaner]
})

const Version = new Schema({
    rejectionExplenation: String,
    editorName: String,
    projectDescription: String,
    versionNumber: Number,
    subjects: [Subject],
    generalAssumptions: [String],
    currentAssumptions: [String],
    // date: Date ,
    date: String,
    allActors: [Actor],
    pricing: [Process],
    additionalPricing: String,
    grandTotalPrice: {type: Number, default: 0},
    subTotalPrice: {type: Number, default: 0},
    projectName: String,
    payment: String,
    diagramDescription: String,
    diagramLink: String,
    specificationDescription: String,
    specificationLink: String,
    discount : {type: Number, default: 0},
    scopingStatus: Boolean,
    pricingStatus: Boolean
});

const Project = new Schema({
    projectName: String,
    allVersions: [Version]
    // _id : Number
})


module.exports = mongoose.model("newProject", Project);