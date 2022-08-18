import React, {FC, SetStateAction} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
  buttonStyle: any;
  textStyle: any;
}

const Button: FC<Props> = ({onPress, text, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
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
  text: {},
});

export default Button;
