import React, { useState, useMemo } from 'react';
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { useDispatch } from 'react-redux';
import { themNguoi } from '../store/danhSachSlice';

export default function EmployeeModal({
  visible,
  onClose,
}) {
    const dispatch = useDispatch();

const [ten, setTen] = useState('');
const [tuoi, setTuoi] = useState('');
const [birthday, setBirthday] = useState(new Date());
const [sdt, setSdt] = useState('');
const [email, setEmail] = useState('');
const [showDatePicker, setShowDatePicker] = useState(false);
const chucDanhList = useMemo(() => [
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
const resetForm = () => {
  setTen('');
  setTuoi('');
  setBirthday(new Date());
  setSdt('');
  setEmail('');
  setChucDanh(chucDanhList[0]);
};
const luuThongTin = () => {
  if (ten.trim() === '') {
    Alert.alert('Thông báo', 'Bạn chưa nhập tên');
    return;
  }

  if (tuoi.trim() === '') {
    Alert.alert('Thông báo', 'Bạn chưa nhập tuổi');
    return;
  }

  if (sdt.trim() === '') {
    Alert.alert('Thông báo', 'Bạn chưa nhập SĐT');
    return;
  }

  if (email.trim() === '') {
    Alert.alert('Thông báo', 'Bạn chưa nhập Email');
    return;
  }

  const nguoiMoi = {
    id: Date.now().toString(),
    ten,
    tuoi,
    ngaySinh: formatDate(birthday),
    sdt,
    email,
    chucDanh,
  };

  dispatch(themNguoi(nguoiMoi));

  resetForm();
  onClose();
};
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalNen}>
          <View style={styles.modalBox}>
            <Text style={styles.sectionTitle}>
              Bảng Thuộc Tính
            </Text>
         
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
            placeholder="Nhập Email"
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
            onValueChange={setChucDanh}
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
            style={styles.saveButton}
            onPress={luuThongTin}
        >
            <Text style={styles.buttonText}>
            Lưu
            </Text>
        </Pressable>

        <Pressable
            style={styles.closeButton}
            onPress={onClose}
        >
            <Text style={styles.buttonText}>
            Đóng
            </Text>
        </Pressable>
        </View>
         </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  pickerBox: {
  flex: 5,
  borderWidth: 2,
  borderRadius: 5,
  justifyContent: 'center',
  },
});