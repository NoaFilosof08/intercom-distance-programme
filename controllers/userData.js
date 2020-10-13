const UserData = require('../models/userData')
const userData = require('../models/userData')

async function userDataIndex(req, res) {
  const users = await UserData.find()
  res.status(200).json(users)
}

async function userDataGet(req, res) {
  try {
    const users = await UserData.find()
    const newUsers = []
    users.forEach((user) => {
      function equation() {
        // Convert degrees into radians
        const dbLong = -6.257664 * Math.PI/180
        const dbLat = 53.339428 * Math.PI/180
        console.log('DUBLIN: ', dbLong, dbLat)

        const datasetLong = user.longitude
        const datasetLat = user.latitude
        console.log('USER long', datasetLong, 'USER lat', datasetLat)

        const dataLong = datasetLong * Math.PI/180
        const dataLat = datasetLat * Math.PI/180
        console.log('USER DATA IN RADIANS', dataLong, dataLat)

        // calculate the absolute distance between the longitudes and latitudes
        const longDiff = (dataLong-dbLong)
        console.log('difference', longDiff)

        // calculate the equation
        const centralAngle = Math.acos( Math.sin(dbLat) * Math.sin(dataLat) + Math.cos(dbLat) * Math.cos(dataLat) * Math.cos(longDiff))
        console.log('central angle', centralAngle)

        // calculate arc length
        const r = 6371e3 //meters
        d = r * centralAngle
        console.log('arc length:', d)
      }
      equation()

      // convert d (answer in meters) to km
      function convert() {
        const km = d / 1000
        if ( km <= 100 ) {
          const conversion = km.toFixed(1) + ' km'
          const newObject = { user_id: user.user_id, distance: conversion, name: user.name }
          newUsers.push(newObject)
        }
      }
      convert()
    })
    newUsers.sort(function(a, b) {
      return a.user_id - b.user_id
    })
    res.status(201).json(newUsers)
  } catch (err) {
    console.log(err)
  }
}

async function userDelete(req, res) {
  try {
    const userToDelete =  await userData.findById(req.params.id)
    await userToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    console(err)
  }
}

module.exports = {
  index: userDataIndex,
  get: userDataGet,
  delete: userDelete
}
