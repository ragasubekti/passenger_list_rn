import React from 'react'

/**
 * 
 * @param {Object} passenger 
 * @param {String} passenger.name
 * @param {Number} passenger.trips
 * @param {Array.<{name: String, country: String, logo: String}>} passenger.airline
 * @returns 
 */
const PassengerData = (passenger) => {
    return (
        <Card>
            <Card.Title>{passenger.name}</Card.Title>
            <Card.Divider></Card.Divider>
            <View>
                <Text>Total Trips: {passenger.trips}</Text>
            </View>
            <View>
                <Text>Airline:</Text>
            </View>
            {passenger.airline.map(airline => (
                <View>
                    <View>
                        <Image source={airline.logo} style={{width: '60px'}}/>
                        <Text>{airline.name}</Text>
                    </View>
                    <View>
                        <Text>Destination: {airline.country}</Text>
                    </View>
                </View>
            ))}

        </Card>
    )
}