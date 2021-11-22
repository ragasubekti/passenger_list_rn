import React, {useEffect} from 'react'
import {  Text, Card, Title, Paragraph, Avatar } from 'react-native-paper'
import { View, Image} from 'react-native'

/**
 * 
 * @param {Object} passenger 
 * @param {String} passenger.name
 * @param {Number} passenger.trips
 * @param {Array.<{name: String, country: String, logo: String}>} passenger.airline
 * @returns 
 */
const PassengerData = ({passenger}) => {
    useEffect(() => {
        console.log(passenger)
    }, [])
    return (
        <Card>
            <Card.Content>
                <View style={{flex:1 ,justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                <Title>{passenger.name}</Title>
                <Paragraph>{passenger.trips} Trips</Paragraph>
                </View>
                {/* <Text>{JSON.stringify(passenger)}</Text> */}
                {passenger.airline.map((airline, key) => {
                    return (
                    <>
                        <View>
                            <Image source={{uri: airline.logo}} style={{width: 100, height: 60, resizeMode: 'contain'}}/>
                            <Text>{airline.name}</Text>
                            <Text>Destination: {airline.country}</Text>
                        </View>
                    </>
                    )
                    }
                    // <View>
                    //     <View>
                    //     </View>
                    //     <View>
                    //         <Text>Destination: {airline.country}</Text>
                    //     </View>
                    // </View>
                    )}
            </Card.Content>
        </Card>
    )
}

export default PassengerData