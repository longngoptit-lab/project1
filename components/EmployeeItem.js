import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { xoaNguoi } from '../store/danhSachSlice';

export default function EmployeeItem({ item }) {
  const dispatch = useDispatch();

  const darkMode = useSelector(
    state => state.setting.darkMode
  );

  const xoaThongTin = () => {
    dispatch(xoaNguoi(item.id));
  };

  return (
    <View style={styles.itemBox}>
      <Text
        style={[
          styles.itemText,
          { color: darkMode ? '#fff' : '#000' },
        ]}>
        Tên: {item.ten}
      </Text>

      <Text
        style={[
          styles.itemText,
          { color: darkMode ? '#fff' : '#000' },
        ]}>
        Tuổi: {item.tuoi}
      </Text>

      <Text
        style={[
          styles.itemText,
          { color: darkMode ? '#fff' : '#000' },
        ]}>
        Ngày sinh: {item.ngaySinh}
      </Text>

      <Text
        style={[
          styles.itemText,
          { color: darkMode ? '#fff' : '#000' },
        ]}>
        SĐT: {item.sdt}
      </Text>

      <Text
        style={[
          styles.itemText,
          { color: darkMode ? '#fff' : '#000' },
        ]}>
        Email: {item.email}
      </Text>

      <Text
        style={[
          styles.itemText,
          { color: darkMode ? '#fff' : '#000' },
        ]}>
        Chức danh: {item.chucDanh}
      </Text>

      <Pressable
        style={styles.deleteButton}
        onPress={xoaThongTin}>
        <Text style={styles.buttonText}>
          Xóa
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 15,
    marginBottom: 15,
  },

  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },

  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});