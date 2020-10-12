const { db } = require("../models/userData")

function equation() {
  // Convert degrees into radians
  const dbLong = 53.339428 * Math.PI/180
  const dbLat = -6.257664 * Math.PI/180
  console.log(dbLong, dbLat)

  const datasetLong = 52.986375
  const datasetLat = -6.043701

  const dataLong = datasetLong * Math.PI/180
  const dataLat = datasetLat * Math.PI/180
  console.log(dataLong, dataLat)

  // calculate the absolute distance between the longitudes and latitudes
  const latDiff = (dbLat-dataLat)
  const longDiff = (dataLong-dbLong)
  console.log(latDiff, longDiff)

  // calculate the equation
  const centralAngle = Math.acos( Math.sin(dbLat) * Math.sin(dataLat) + Math.cos(dbLat) * Math.cos(dataLat) * Math.cos(longDiff))
  console.log(centralAngle)

  // calculate arc length
  const r = 6371e3 //meters
  const d = r * centralAngle
  console.log(d)
}

equation()

module.exports = {
  equation
}
