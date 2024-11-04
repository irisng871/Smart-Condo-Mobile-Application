import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './navigation';

type Props = {
    route: RouteProp<RootStackParamList, 'HistoryVisitorPassDetails'>;
};

const HistoryVisitorPassDetails: React.FC<Props> = ({ route }) => {
    const { pass } = route.params; // Get the pass from the route params

    return (
        <View style={styles.container}>
            <Text style={styles.detailText}>Name: {pass.name}</Text>
            <Text style={styles.detailText}>Contact: {pass.contact}</Text>
            <Text style={styles.detailText}>Emergency Contact: {pass.emergencycontact}</Text>
            <Text style={styles.detailText}>IC Number / Passport Number: {pass.icNumber}</Text>
            <Text style={styles.detailText}>Car Plate Number: {pass.carPlateNumber}</Text>
            <Text style={styles.detailText}>Date: {pass.selectedDate}</Text>
            <Text style={styles.detailText}>Time: {pass.selectedTime}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 24,
    backgroundColor: '#E6ECEF',
    flex: 1,
  },
  detailText: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 14,
    color: '#333',
  },
});

export default HistoryVisitorPassDetails;
