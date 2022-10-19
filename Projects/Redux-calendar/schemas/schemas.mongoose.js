const mongoose = require('mongoose')
const Schema = mongoose.Schema

const existingUsersScheme = new Schema(
  {
    login: {
      type: String,
      minLength: 3,
      maxLength: 21,
      unique: true
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 48
    },
    birthday: {
      type: String,
      minLength: 10,
      maxLength: 10
    }
  },
  { versionKey: false }
)

const iBlockTask = {
  _id: false,
  id: Number,
  timestamp: Number,
  title: String,
  posTop: Number,
  height: Number,
  position: String,
  posLeft: Number
}

const usersTasks = new Schema(
  {
    user: {
      type: String,
      minLength: 3,
      maxLength: 21,
      unique: true
    },
    tasks: [iBlockTask]
  },
  { versionKey: false }
)

module.exports = { existingUsersScheme, usersTasks }
