
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reset } from './store/danhSachSlice';
import { doiCheDo } from './store/settingSlice';
import Header from './components/Header';
import ActionButtons from './components/ActionButtons';
import EmployeeList from './components/EmployeeList';
import EmployeeModal from './components/EmployeeModal';

export default function App() {
const [modalVisible, setModalVisible] = useState(false);
  const [nguoiDangSua, setNguoiDangSua] = useState(null);
  const hienmodal = useCallback(() => {
    setModalVisible(true);
    }, []);

  const closeModal = useCallback(() => {
  setModalVisible(false);
}, []);
  const suaThongTin = (nguoi) => {
  setNguoiDangSua(nguoi);
  setModalVisible(true);
};
const dispatch = useDispatch();

const resetDemo = useCallback(() => {
  dispatch(reset());
}, [dispatch]);
const chuyenCheDo = () => {
  dispatch(doiCheDo());
};
const darkMode = useSelector(
  state => state.setting.darkMode
);
  return (
    <SafeAreaView style={[styles.container,
      {
      backgroundColor: darkMode ? '#222' : '#fff',
    },
    ]}>
      <ScrollView>
        
        <Header />
        <Text style={[styles.sectionTitle,
          {color: darkMode ? '#fff' : '#000',}
        ]}>Hành Động</Text>

        <ActionButtons
              hienmodal={hienmodal}
              resetDemo={resetDemo}
              chuyenCheDo={chuyenCheDo}
            />
          <EmployeeModal
        visible={modalVisible}
        onClose={closeModal}
    />
        <Text style={[styles.sectionTitle,
          {color: darkMode ? '#fff' : '#000',}
        ]}>Bảng dữ liệu</Text>

        <EmployeeList
         onEdit={suaThongTin}
          />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },

  dButton: {
    flex: 1,
  },

  mainButton: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    margin: 30,
  },

  sTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    color: 'white'
  },
});