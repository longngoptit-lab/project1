import React from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

export default function ActionButtons({
  hienmodal,
  resetDemo,
  chuyenCheDo,
}) {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.button}>
          <Pressable
            onPress={chuyenCheDo}
            style={({ pressed }) => [
              styles.mainButton,
              {
                backgroundColor: pressed
                  ? 'grey'
                  : 'blue',
              },
            ]}>
            <Text style={styles.text}>
              Đổi chế độ
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.button}>
          <Pressable
            onPress={hienmodal}
            style={({ pressed }) => [
              styles.mainButton,
              {
                backgroundColor: pressed
                  ? 'grey'
                  : 'green',
              },
            ]}>
            <Text style={styles.text}>
              Thêm
            </Text>
          </Pressable>
        </View>

        <View style={styles.button}>
          <Pressable
            onPress={resetDemo}
            style={({ pressed }) => [
              styles.mainButton,
              {
                backgroundColor: pressed
                  ? 'grey'
                  : 'red',
              },
            ]}>
            <Text style={styles.text}>
              Reset
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },

  button: {
    flex: 1,
  },

  mainButton: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    margin: 30,
  },

  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});