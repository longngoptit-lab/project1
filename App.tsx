import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';

 
export default function app(){
   const [name, setName] = useState('');
  return(

    <SafeAreaView style={styles.container}>
      <ScrollView>
      
      <View>
        <Text style={{textAlign: 'center',paddingTop:50, fontSize:26}}> Quản lý bảng đơn giản giản</Text>
        <Text style={{marginTop:1,marginBottom:20,fontSize:10, textAlign: 'center' }}> Thêm • Sửa • Xóa thuộc tính (cột) và dữ liệu (dòng)</Text>
      </View>
    
      <View>
        <Text style={{marginTop:5,marginBottom:10,fontSize:20, textAlign: 'center' }}> Bảng thuộc tính </Text>
      </View>
    
    <View style={{flexDirection: 'row', margin:20}}>
       <TextInput style={styles.an} placeholder='nhập tên của thuộc tính'/>
       <Pressable style={({ pressed }) => ({backgroundColor: pressed ? 'green' : 'blue',padding: 10, borderRadius: 8, alignItems: 'center',})}>
  <Text style={{ color: 'white' }}>thêm</Text>
</Pressable>
    </View>
  <View style={styles.row}>
    <Text style={styles.cell}>Tên</Text>
    <TextInput style={styles.long} placeholder="..."/>
    <Pressable style={styles.pressed}>
  <Text style={{color:'blue'}}>Lưu</Text>
</Pressable>
  </View>


  <View style={styles.row}>
    <Text style={styles.cell}>Tuổi</Text>
    <TextInput style={styles.long} placeholder="..."/>
    <Pressable style={styles.pressed}>
  <Text style={{color:'blue'}}>Lưu</Text>
</Pressable>
  </View>


  <View style={styles.row}>
    <Text style={styles.cell}>email</Text>
   <TextInput style={styles.long} placeholder="..."/>
    <Pressable style={styles.pressed}>
  <Text style={{color:'blue'}}>Lưu</Text>
</Pressable>
  </View>

  <View style={styles.row}>
    <Text style={styles.cell}>sdt</Text>
    <TextInput style={styles.long} placeholder="..."/>
    <Pressable style={styles.pressed}>
  <Text style={{color:'blue'}}>Lưu</Text>
</Pressable>
  </View>

  <View>
    <Text style={{marginTop:25,marginBottom:10,fontSize:24,textAlign:'center'}}>Bảng dữ liệu</Text>
  </View>
  <View>
    <View style={styles.row}> 
      <Pressable
       style={({pressed}) => ({padding:10,backgroundColor: pressed ? 'grey':'green',borderWidth:1,marginBottom:20,borderRadius:8})}>
        <Text style={{fontWeight:'600',fontSize:20,color:'white'}}>
          + thêm dòng mới
        </Text>
      </Pressable>
    </View>
    <View style={styles.row}>
      <Text style={styles.hihi}> tên </Text>
      <Text style={styles.cell}> tuổi </Text>
      <Text style={styles.hihi}> email </Text>
      <Text style={styles.hihi}> sdt </Text>
      <Text style={styles.hihi}> thao tác </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.hihi}> ... </Text>
      <Text style={styles.cell}> ... </Text>
      <Text style={styles.hihi}> ... </Text>
      <Text style={styles.hihi}> ... </Text>
      <Text style={styles.hihi}> sua </Text>
    </View>
  </View>
  <View>
    <Pressable style ={({pressed}) =>({backgroundColor : pressed ? 'green':'grey', flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',width: 100,
      borderWidth: 1,
      padding: 10, margin:20})}>
  <Text style={{textAlign: 'center',}}>Reset demo</Text>
</Pressable>
  </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
  container:
  {
     flex:1,  
  },
  column:
  {
    flexDirection: 'column',
    marginTop:20
  },
row: {
    flexDirection: 'row',
    marginLeft:10,
    marginRight:10,
  },

  cell: {
    flex: 1,
    borderWidth: 1,
   padding:10,
    textAlign: 'center',
  },
  long:{
    flex:4,
    borderWidth: 1,
  padding:10,
    textAlign: 'center',
  },
  hihi:{
    flex:2,
    borderWidth: 1,
  padding:10,
    textAlign: 'center',
  },
  em:{padding:10,
    textAlign: 'center',
    borderWidth: 2,
    marginRight:150,
    marginLeft:150,
    marginTop:10,
    borderRadius: 8,
    backgroundColor:'grey',
    
  },
   pressed:{
    flex:1,
  padding:10,
  justifyContent:'center',
  alignItems:'center',
  borderWidth:1,
},
an:{
   borderWidth:1,
   flex:6,
  padding:10,
  marginRight:10,
  borderRadius:10,
  borderColor:'blue'
   }
,
})