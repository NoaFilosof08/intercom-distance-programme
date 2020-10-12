const UserData = require('../models/userData')
// const userDataNew = require('../models/userDataNew')

// async function userDataIndex(req, res) {
//   const users = await UserData.find()
//   res.status(200).json(users)
// }

async function userDataGet(req, res) {

  try {
    const users = await UserData.find()
    // console.log(users)
    // const newarray = []
    const newUsers = {}
    // console.log(newarray)
    // const newArray = userDataNew
    // console.log(newArray)
    users.forEach((user) => {
      function equation() {
        // Convert degrees into radians
        const dbLong = -6.257664 * Math.PI/180
        const dbLat = 53.339428 * Math.PI/180
        console.log(dbLong, dbLat)

        const datasetLong = user.longitude
        const datasetLat = user.latitude
        console.log('long', datasetLong, 'lat', datasetLat)

        const dataLong = datasetLong * Math.PI/180
        const dataLat = datasetLat * Math.PI/180
        console.log(dataLong, dataLat)

        // calculate the absolute distance between the longitudes and latitudes
        // const latDiff = (dbLat-dataLat)
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

        // console.log(newArray)
        if ( km <= 100 ) {
          newArray = { user_id: user.user_id, distance: km, name: user.name }
          // newArray.push(user)
          console.log('convert', newArray)
        }
        // converstion = km.toFixed(1) + ' km'
        // console.log(converstion)
      }
      convert()
      // console.log('conversion: ', converstion)
    })
    newUsers.push(newArray)
    console.log(newUsers)
    // console.log('out of scope', newArray)
    res.status(201).json(newArray)
  } catch (err) {
    console.log(err)
  }
}

// async function userDataEdit(req, res) {
//   try {
//     // const users = await UserData.find()
//     const dataToBeEdited = await UserData.findById(req.params.id)
//     console.log(dataToBeEdited)
//     function equation() {
//       // Convert degrees into radians
//       const dbLong = -6.257664 * Math.PI/180
//       const dbLat = 53.339428 * Math.PI/180
//       console.log(dbLong, dbLat)

//       const datasetLong = dataToBeEdited.longitude
//       const datasetLat = dataToBeEdited.latitude
//       console.log('long', datasetLong, 'lat', datasetLat)

//       const dataLong = datasetLong * Math.PI/180
//       const dataLat = datasetLat * Math.PI/180
//       console.log(dataLong, dataLat)

//       // calculate the absolute distance between the longitudes and latitudes
//       // const latDiff = (dbLat-dataLat)
//       const longDiff = (dataLong-dbLong)
//       console.log('difference', longDiff)

//       // calculate the equation
//       const centralAngle = Math.acos( Math.sin(dbLat) * Math.sin(dataLat) + Math.cos(dbLat) * Math.cos(dataLat) * Math.cos(longDiff))
//       console.log('central angle', centralAngle)

//       // calculate arc length
//       const r = 6371e3 //meters
//       d = r * centralAngle
//       console.log('arc length:', d)
//     }
//     equation()

//     // convert d (answer in meters) to km
//     function convert() {
//       const km = d / 1000
//       converstion = km.toFixed(1) + ' km'
//       console.log(converstion)
//     }
//     convert()
//     const distance = converstion
//     console.log('distance', distance)
//     dataToBeEdited.distance.push(distance)
//     console.log(dataToBeEdited)
//     // await dataToBeEdited.save()
//     res.status(201).json(distance)
//   } catch (err) {
//     console.log(err)
//   }

// }


module.exports = {
  // index: userDataIndex,
  // edit: userDataEdit,
  get: userDataGet
}
