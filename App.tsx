
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { themNguoi, xoaNguoi, reset } from './store/danhSachSlice';
import { doiCheDo } from './store/settingSlice';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [ten, setTen] = useState('');
  const [tuoi, setTuoi] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [sdt, setSdt] = useState('');
  const [email, setEmail] = useState('');
 const dispatch = useDispatch();
 const danhSach = useSelector(
  (state: any) => state.danhSach.danhSach
);
  const [showDatePicker, setShowDatePicker] = useState(false);

    const chucDanhList = useMemo(()=>[
  'Giám đốc',
  'Phó giám đốc',
  'Trưởng phòng',
  'Phó phòng',
  'Trưởng nhóm',
  'Nhân viên',
  'Kế toán',
  'Thủ quỹ',
  'Hành chính nhân sự',
  'Kinh doanh',
  'Marketing',
  'Kỹ thuật',
  'Lập trình viên',
  'Thiết kế',
  'Thực tập sinh'
  ], []);
const [chucDanh, setChucDanh] = useState(chucDanhList[0]);

  const hienmodal = useCallback(() => {
    setModalVisible(true);
    }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setShowDatePicker(false);
  },[]);

  const formatDate = (date) => {
    const ngay = date.getDate().toString().padStart(2, '0');
    const thang = (date.getMonth() + 1).toString().padStart(2, '0');
    const nam = date.getFullYear();

    return `${ngay}/${thang}/${nam}`;
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const resetForm = useCallback(() => {
    setTen('');
    setTuoi('');
    setBirthday(new Date());
    setSdt('');
    setEmail('');
    setChucDanh(chucDanhList[0]);
  },[]);

  const luuThongTin = () => {
    if (ten.trim() === '') {
      Alert.alert('Thông báo', 'Bạn chưa nhập tên');
      return;
    }
    if (tuoi.trim() === '') {
      Alert.alert('Thông báo', 'Bạn chưa nhập tuoi');
      return;
    }
    if (sdt.trim() === '') {
      Alert.alert('Thông báo', 'Bạn chưa nhập sdt');
      return;
    }
      if (email.trim() === '') {
      Alert.alert('Thông báo', 'Bạn chưa nhập email');
      return;
    }

    const nguoiMoi = {
      id: Date.now().toString(),
      ten: ten,
      tuoi: tuoi,
      ngaySinh: formatDate(birthday),
      sdt: sdt,
      email: email,
      chucDanh,
    };

   dispatch(themNguoi(nguoiMoi));

    resetForm();
    closeModal();
  };

const xoaThongTin = (id) => {
  dispatch(xoaNguoi(id));
};

const resetDemo = useCallback(() => {
    dispatch(reset());
}, [dispatch]);
const darkMode = useSelector(
  state => state.setting.darkMode
);
const chuyenCheDo = () => {
    dispatch(doiCheDo());
};

  return (
    <SafeAreaView style={[styles.container,
      {
      backgroundColor: darkMode ? '#222' : '#fff',
    },
    ]}>
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.dButton}>
            <Pressable onPress={chuyenCheDo}
              style={({ pressed }) => [
                styles.mainButton,
                { backgroundColor: pressed ? 'grey' : 'blue' },
              ]}>
               <Text style={styles.sTitle}>Đổi chế độ</Text>
            </Pressable>
          </View>
        </View>
        
        <Text style={[styles.title,
          {color: darkMode ? '#fff' : '#000',}
        ]}>Quản lý bảng đơn giản</Text>

        <Text style={[styles.subtitle,
          {color: darkMode ? '#fff' : '#000',}
        ]}>
          Thêm • Sửa • Xóa thuộc tính và dữ liệu
        </Text>

        <Text style={[styles.sectionTitle,
          {color: darkMode ? '#fff' : '#000',}
        ]}>Hành Động</Text>

        <View style={styles.row}>
          <View style={styles.dButton}>
            <Pressable
              onPress={hienmodal}
              style={({ pressed }) => [
                styles.mainButton,
                { backgroundColor: pressed ? 'grey' : 'green' },
              ]}
            >
              <Text style={styles.sTitle}>Thêm</Text>
            </Pressable>
          </View>

          <View style={styles.dButton}>
            <Pressable
              onPress={resetDemo}
              style={({ pressed }) => [
                styles.mainButton,
                { backgroundColor: pressed ? 'grey' : 'red' },
              ]}
            >
              <Text style={styles.sTitle}>Reset</Text>
            </Pressable>
          </View>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalNen}>
              <View style={styles.modalBox}>
                <Text style={styles.sectionTitle}>Bảng Thuộc Tính</Text>

                <View style={styles.inputRow}>
                  <Text style={styles.ttt}>Tên</Text>
                  <TextInput
                    style={styles.nhaptextinput}
                    placeholder="Nhập họ và tên"
                    value={ten}
                    onChangeText={setTen}
                  />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.ttt}>Tuổi</Text>
                  <TextInput
                    style={styles.nhaptextinput}
                    placeholder="Nhập tuổi"
                    keyboardType="numeric"
                    value={tuoi}
                    onChangeText={setTuoi}
                  />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.ttt}>Ngày sinh</Text>

                  <Pressable
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text>{formatDate(birthday)}</Text>
                  </Pressable>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    value={birthday}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChangeDate}
                  />
                )}

                <View style={styles.inputRow}>
                  <Text style={styles.ttt}>SĐT</Text>
                  <TextInput
                    style={styles.nhaptextinput}
                    placeholder="Nhập số điện thoại"
                    keyboardType="phone-pad"
                    value={sdt}
                    onChangeText={setSdt}
                  />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.ttt}>Email</Text>
                  <TextInput
                    style={styles.nhaptextinput}
                    placeholder="Nhập email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                  <View style={styles.inputRow}>
                  <Text style={styles.ttt}>Chức danh</Text>
                  <View style={styles.pickerBox}>
                    <Picker
                      selectedValue={chucDanh}
                      onValueChange={(itemValue) => setChucDanh(itemValue)}
                    >
                      {chucDanhList.map((item) => (
                        <Picker.Item
                          key={item}
                          label={item}
                          value={item}
                        />
                      ))}
                    </Picker>
                  </View>
                </View> 

                <View style={styles.buttonRow}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.saveButton,
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={luuThongTin}
                  >
                    <Text style={styles.buttonText}>Lưu</Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed }) => [
                      styles.closeButton,
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={closeModal}
                  >
                    <Text style={styles.buttonText}>Đóng</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <Text style={[styles.sectionTitle,
          {color: darkMode ? '#fff' : '#000',}
        ]}>Bảng dữ liệu</Text>

        <View style={styles.card}>
          {danhSach.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có dữ liệu</Text>
          ) : (
            danhSach.map((item) => (
              <View key={item.id} style={styles.itemBox}>
                <Text style={styles.itemText}>Tên: {item.ten}</Text>
                <Text style={styles.itemText}>Tuổi: {item.tuoi}</Text>
                <Text style={styles.itemText}>Ngày sinh: {item.ngaySinh}</Text>
                <Text style={styles.itemText}>SĐT: {item.sdt}</Text>
                <Text style={styles.itemText}>Email: {item.email}</Text>
                 <Text style={styles.itemText}>Chức danh: {item.chucDanh}</Text>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => xoaThongTin(item.id)}
                >
                  <Text style={styles.buttonText}>Xóa</Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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

  modalContainer: {
    flex: 1,
  },

  modalNen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  nhaptextinput: {
    flex: 5,
    borderRadius: 5,
    padding: 10,
    borderWidth: 2,
  },

  dateInput: {
    flex: 5,
    borderRadius: 5,
    padding: 10,
    borderWidth: 2,
    justifyContent: 'center',
  },

  ttt: {
    fontSize: 14,
    flex: 1.5,
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'blue',
    color: 'white',
    marginRight: 5,
    textAlign: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  saveButton: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },

  closeButton: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

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
  pickerBox: {
  flex: 5,
  borderWidth: 2,
  borderRadius: 5,
  justifyContent: 'center',
},
});