import React, { useState, useEffect } from 'react'
import { Alert, FlatList } from 'react-native'
import {} from 'react-native-paper'

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
        <FlatList
            contentContainerStyle={{
                backgroundColor: '#fff',
                marginTop: 15,
            }}
            data={passengerData}
            keyExtractor={passenger => passenger._id}
            onEndReached={fetchNextPassengerData}
            onEndReachedThreshold={1}

            renderItem={({ item }) => (
                <PassengerData passenger={item} />
            )}
        />
    )
}


export default Home