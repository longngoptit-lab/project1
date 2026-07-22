import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Header() {
    const darkMode = useSelector(
    state => state.setting.darkMode
);
  return (
    <View>
      <Text
        style={[
          styles.title,
          { color: darkMode ? '#fff' : '#000' },
        ]}>
        Quản lý bảng đơn giản
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: darkMode ? '#fff' : '#000' },
        ]}>
        Thêm • Sửa • Xóa thuộc tính và dữ liệu
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingTop: 50,
    fontSize: 26,
    fontWeight: '600',
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 20,
    fontSize: 12,
    textAlign: 'center',
  },
});