import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { xoaNguoi } from '../store/danhSachSlice';
import EmployeeItem from './EmployeeItem';

export default function EmployeeList() {
  const dispatch = useDispatch();

  const danhSach = useSelector(
    state => state.danhSach.danhSach
  );
  const darkMode = useSelector(
  state => state.setting.darkMode
);

  const xoaThongTin = (id) => {
    dispatch(xoaNguoi(id));
  };

  return (
    <View style={styles.card}>
      {danhSach.length === 0 ? (
        <Text
          style={[
            styles.emptyText,
            { color: darkMode ? '#fff' : '#000' },
          ]}>
          Chưa có dữ liệu
        </Text>
      ) : (
        
        danhSach.map(item=>(
                <EmployeeItem
                    key={item.id}
                    item={item}
                />
            ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
});