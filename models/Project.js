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
    task : String,
    days : Number
});

const TaskContaner = new Schema({
    containerName: String,
    days : Number,
    price : {type: Number, default: 0},
    tasks: [Task]
})

const Process = new Schema({
    milestoneName : String,
    processTotalPrice : {type: Number, default: 0},
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
    date: { type: Date, default: Date.now },
    allActors: [Actor],
    pricing: [Process],
    grandTotalPrice: {type: Number, default: 0},
    discount : {type: Number, default: 0}
});

const Project = new Schema({
    projectName: String,
    allVersions: [Version]
});


module.exports = mongoose.model("newProject", Project);