import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RootStackParamList } from './navigation';

type FacilitiesDetailsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'FacilitiesDetails'>;
  route: RouteProp<RootStackParamList, 'FacilitiesDetails'>;
};

const FacilitiesDetails: React.FC<FacilitiesDetailsProps> = ({ route }) => {
  const { name, image, location, hours, specifications } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>{name}</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.info}>Location: {location}</Text>
      <Text style={styles.info}>Operating Hours: {hours}</Text>
      <Text style={styles.info}>Specifications:</Text>
      {specifications.map((spec, index) => (
        <Text key={index} style={styles.info}>{`• ${spec}`}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginLeft: 20,
  },
  image: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 5,
    color: '#000',
  },
});

export default FacilitiesDetails;
