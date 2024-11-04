import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PassDetails, RootStackParamList } from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HistoryVisitorPassNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HistoryVisitorPass'>;

interface Props {
    route: {
        params: {
            passes: PassDetails[];
        };
    };
    navigation: HistoryVisitorPassNavigationProp;
}

const HistoryVisitorPass: React.FC<Props> = ({ route, navigation }) => {
    const { passes } = route.params;

    const clearVisitorPasses = async () => {
        Alert.alert(
            'Clear Visitor Passes',
            'Are you sure you want to clear all visitor passes?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('visitorPassHistory');
                            Alert.alert('Success', 'All visitor passes cleared successfully!');
                            // Optionally, refresh the passes or navigate back
                            navigation.goBack();
                        } catch (error) {
                            console.error('Failed to clear visitor passes:', error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Visitor Pass History</Text>
            {passes.map((pass, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.bookingBox}
                    onPress={() => navigation.navigate('HistoryVisitorPassDetails', { pass })}
                >
                    <Text style={styles.bookingTitle}>{pass.name}</Text>
                    <Text style={styles.bookingDetails}>
                        {pass.selectedDate}, {pass.selectedTime}
                    </Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={clearVisitorPasses} style={styles.clearButton}>
                <Text style={styles.clearText}>CLEAR ALL VISITOR PASSES</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    bookingBox: {
        backgroundColor: '#E6ECEF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    bookingDetails: {
        fontSize: 16,
        color: '#000',
        marginBottom: 8,
    },
    clearButton: {
        backgroundColor: 'red',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    clearText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default HistoryVisitorPass;
