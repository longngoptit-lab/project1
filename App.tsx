import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function App() {
  const defaultColumns = ['Tên', 'Tuổi', 'Email', 'SĐT'];

  const [columnName, setColumnName] = useState('');
  const [columns, setColumns] = useState(defaultColumns);
  const [form, setForm] = useState({});
  const [rows, setRows] = useState([]);

  const addColumn = () => {
    const name = columnName.trim();
    if (name === '') return;

    setColumns([...columns, name]);
    setColumnName('');
  };

  const deleteColumn = (column) => {
    setColumns(columns.filter((item) => item !== column));

    const newForm = { ...form };
    delete newForm[column];
    setForm(newForm);

    const newRows = rows.map((row) => {
      const newRow = { ...row };
      delete newRow[column];
      return newRow;
    });

    setRows(newRows);
  };

  const changeValue = (column, value) => {
    setForm({
      ...form,
      [column]: value,
    });
  };

  const saveData = () => {
    const isEmpty = columns.every((column) => {
      return !form[column] || form[column].trim() === '';
    });

    if (isEmpty) return;

    const newRow = {};

    columns.forEach((column) => {
      newRow[column] = form[column] || '';
    });

    setRows([...rows, newRow]);
    setForm({});
  };

  const resetDemo = () => {
    setColumns(defaultColumns);
    setForm({});
    setRows([]);
    setColumnName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Quản lý bảng đơn giản</Text>

        <Text style={styles.subtitle}>
          Thêm • Sửa • Xóa thuộc tính và dữ liệu
        </Text>

        <Text style={styles.sectionTitle}>Bảng thuộc tính</Text>

        <View style={styles.addRow}>
          <TextInput
            style={styles.addInput}
            placeholder="Nhập tên thuộc tính"
            value={columnName}
            onChangeText={setColumnName}
          />

          <Pressable style={styles.addButton} onPress={addColumn}>
            <Text style={styles.buttonText}>Thêm</Text>
          </Pressable>
        </View>

        {columns.map((column, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.nameCell}>{column}</Text>

            <TextInput
              style={styles.inputCell}
              placeholder="..."
              value={form[column] || ''}
              onChangeText={(text) => changeValue(column, text)}
            />

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteColumn(column)}
            >
              <Text style={styles.deleteText}>Xóa</Text>
            </Pressable>
          </View>
        ))}

        <Pressable style={styles.saveButton} onPress={saveData}>
          <Text style={styles.buttonText}>Lưu thông tin</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Bảng dữ liệu</Text>

        <ScrollView horizontal>
          <View>
            <View style={styles.tableRow}>
              {columns.map((column, index) => (
                <Text style={styles.tableHeader} key={index}>
                  {column}
                </Text>
              ))}
            </View>

            {rows.map((row, rowIndex) => (
              <View style={styles.tableRow} key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <Text style={styles.tableCell} key={columnIndex}>
                    {row[column]}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        <Pressable style={styles.resetButton} onPress={resetDemo}>
          <Text style={styles.resetText}>Reset demo</Text>
        </Pressable>
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

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },

  addRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },

  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },

  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },

  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  nameCell: {
    width: 90,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },

  inputCell: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },

  deleteButton: {
    width: 70,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },

  deleteText: {
    color: 'red',
    fontWeight: '600',
  },

  saveButton: {
    backgroundColor: 'blue',
    margin: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },

  tableRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  tableHeader: {
    width: 120,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: '600',
  },

  tableCell: {
    width: 120,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },

  resetButton: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    width: 120,
    padding: 10,
    margin: 20,
    borderWidth: 1,
  },

  resetText: {
    textAlign: 'center',
  },
});