import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const successImage = require('./images/green-tick.png');

type PayDepositNavigationProp = StackNavigationProp<RootStackParamList, 'PayDeposit'>;

const PayDeposit: React.FC = () => {
  const navigation = useNavigation<PayDepositNavigationProp>();
  const [selectedTab, setSelectedTab] = useState('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [receipt, setReceipt] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateInputs = () => {
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    const cvvRegex = /^\d{3,4}$/;

    if (selectedTab === 'card') {
      if (!cardName.trim()) {
        Alert.alert('Invalid Input', 'Card Name is required.');
        return false;
      }
      if (!cardNumberRegex.test(cardNumber)) {
        Alert.alert('Invalid Input', 'Card Number must be 16 digits long.');
        return false;
      }
      if (!expiryDateRegex.test(expiryDate)) {
        Alert.alert('Invalid Input', 'Expiry Date must be in MM/YY format.');
        return false;
      }
      if (!cvvRegex.test(cvv)) {
        Alert.alert('Invalid Input', 'CVV must be 3 or 4 digits long.');
        return false;
      }
      if (!referenceNumber.trim()) {
        Alert.alert('Invalid Input', 'Reference Number is required.');
        return false;
      }
    } else if (selectedTab === 'ewallet') {
      if (!referenceNumber.trim()) {
        Alert.alert('Invalid Input', 'Reference Number is required.');
        return false;
      }
      if (!receipt.trim()) {
        Alert.alert('Invalid Input', 'Receipt is required.');
        return false;
      }
    }
    return true;
  };

  const handleDone = async () => {
    if (!validateInputs()) {return;}

    try {
      const dataToSave = {
        cardName,
        cardNumber,
        expiryDate,
        cvv,
        referenceNumber,
        receipt: selectedTab === 'ewallet' ? receipt : '',
      };
      await AsyncStorage.setItem('paymentData', JSON.stringify(dataToSave));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to save data to AsyncStorage', error);
    }
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    setCardName('');
    setCardNumber('');
    setExpiryDate('');
    setCVV('');
    setReferenceNumber('');
    setReceipt('');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'card' && styles.activeTabButton]} onPress={() => setSelectedTab('card')}>
          <Text style={styles.tabText}>Debit / Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, selectedTab === 'ewallet' && styles.activeTabButton]} onPress={() => setSelectedTab('ewallet')}>
          <Text style={styles.tabText}>TNG Ewallet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {selectedTab === 'card' && (
          <View>
            <TextInput style={styles.input} placeholder="Card Name" value={cardName} onChangeText={setCardName} />
            <TextInput style={styles.input} placeholder="Card Number" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" />
            <View style={styles.row}>
              <TextInput style={[styles.input, styles.halfInput]} placeholder="Expiry Date (MM/YY)" value={expiryDate} onChangeText={setExpiryDate} />
              <TextInput style={[styles.input, styles.halfInput]} placeholder="CVV" value={cvv} onChangeText={setCVV} secureTextEntry keyboardType="numeric" />
            </View>
            <TextInput style={styles.input} placeholder="Reference Number" value={referenceNumber} onChangeText={setReferenceNumber} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
                <Text style={styles.doneButtonText}>PAY</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTab === 'ewallet' && (
          <View>
            <Image source={require('./images/qrcode.jpg')} style={styles.qrCode} />
            <Text style={styles.scanText}>Scan to Pay</Text>
            <TextInput style={styles.input} placeholder="Reference Number" value={referenceNumber} onChangeText={setReferenceNumber} />
            <TextInput style={styles.input} placeholder="Receipt" value={receipt} onChangeText={setReceipt} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
                <Text style={styles.doneButtonText}>PAY</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {isSubmitted && (
        <Modal transparent={true} animationType="fade" visible={isSubmitted} onRequestClose={handleModalClose}>
          <TouchableOpacity style={styles.successOverlay} onPress={handleModalClose}>
            <View style={styles.successContainer}>
              <Image source={successImage} style={styles.successImage} />
              <Text style={styles.successText}>Payment{'\n'}Successful!</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BECBD1',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#BECBD1',
  },
  tabText: {
    color: '#000',
    fontSize: 16,
  },
  contentContainer: {
    padding: 30,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  qrCode: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  doneButton: {
    width: 160,
    height: 46,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B9B9B',
    overflow: 'hidden',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
},
successContainer: {
    width: 250,
    height: 270,
    backgroundColor: '#000',
    padding: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
},
successImage: {
    width: 70,
    height: 70,
    marginBottom: 15,
},
successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
},
scanText: {
  fontSize: 18,
  color: '#000',
  textAlign: 'center',
  marginBottom: 20,
},
});

export default PayDeposit;
