import React, {FC, SetStateAction} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

const Input: FC<Props> = ({value, onChange, placeholder}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get('window').width / 1.1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#ffff77',
  },
});

export default Input;
