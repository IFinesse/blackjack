import React, {FC, SetStateAction} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void,
}

const Button: FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button}><Text>submit</Text></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width / 1.1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#AAFF33',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
  },
});

export default Button;
