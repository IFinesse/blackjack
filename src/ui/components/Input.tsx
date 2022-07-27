import React, {FC, SetStateAction} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';

interface Props {
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
}

const Input: FC<Props> = ({value, onChange}) => {
  return (
    <View>
      <TextInput style={styles.input} value={value} onChange={onChange} />
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
  },
});

export default Input;
