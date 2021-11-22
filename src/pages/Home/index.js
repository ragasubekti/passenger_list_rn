import React, { useState, useEffect } from 'react'
import { Alert, FlatList, View, Text, StyleSheet } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'

import axios from 'axios'

import PassengerData from '../../components/PassengerData'

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setLoading] = useState(false)
    const [passengerData, setPassengerData] = useState([])

    const fetchPassengerData = ({ page }) => {
        setCurrentPage(page)
        setLoading(true)

        axios
            .get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
            .then(response => {
                setLoading(false)
                if (response.status == 200) {
                    const _passengerData = response.data.data
                    const _concatPassengerData = passengerData.concat(_passengerData)
                    setPassengerData(_concatPassengerData)
                } else {
                    throw Error(response.statusText)
                }
            })
            .catch(error => {
                setLoading(false)
                Alert.alert("An error has occured", error)
            });
    };

    const fetchNextPassengerData = () => fetchPassengerData({ page: currentPage + 1 })

    useEffect(() => {
        fetchPassengerData({ page: 1 })
    }, [])

    return (
        <>
            <FlatList
                contentContainerStyle={{
                    backgroundColor: '#fff',
                    marginTop: 15,
                }}
                data={passengerData}
                keyExtractor={passenger => passenger._id}
                onEndReached={fetchNextPassengerData}
                onEndReachedThreshold={2}

                renderItem={({ item }) => (
                    <PassengerData passenger={item} />
                )}
            />
            {isLoading && <FixedLoadingInfo />}

        </>
    )
}

const FixedLoadingInfo = () => (
    <View style={styles.loaderContainer}>
        <ActivityIndicator color={Colors.grey400} size={20} style={{ marginRight: 24 }} />
        <Text style={{ fontWeight: '800', fontSize: 16 }}>Please Wait</Text>
    </View>
)


const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff',
        borderRadius: 8, 
        margin: 16, 
        padding: 16, 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderColor: "#ddd", 
        borderWidth: 1, 
        borderStyle: 'solid'
    }
})


export default Home