// components/CustomUploadButton.tsx
import React from 'react';
import { Button, Alert, View, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { isValidFileType, getMimeType } from '../../../utils/fileValidation';

interface UploadButtonProps {
  allowedExtensions: string[];
  buttonTitle?: string;
  onFileSelected?: (file: {
    uri: string;
    name: string;
    size: number | null;
    mimeType: string;
  }) => void;
}

const CustomUploadButton: React.FC<UploadButtonProps> = ({
  allowedExtensions,
  buttonTitle = 'Pilih File',
  onFileSelected,
}) => {
  const handlePickFile = async () => {
    try {
      // Coba filter dengan MIME type jika memungkinkan
      const typeFilter = getMimeTypeFilter(allowedExtensions);

      const result = await DocumentPicker.getDocumentAsync({
        type: typeFilter, // Ini membantu memfilter di UI pemilih
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        Alert.alert('Dibatalkan', 'Tidak ada file yang dipilih.');
        return;
      }

      const file = result.assets[0];
      const { uri, name, size } = file;

      // Validasi ekstensi secara manual (cadangan jika MIME tidak akurat)
      if (!isValidFileType(name, allowedExtensions)) {
        Alert.alert(
          'Format Tidak Didukung',
          `Hanya file dengan ekstensi berikut yang diperbolehkan: ${allowedExtensions.join(', ')}`
        );
        return;
      }

      const mimeType = getMimeType(name);

      // Kirim data file ke komponen induk
      if (onFileSelected) {
        onFileSelected({ uri, name, size: size || null, mimeType });
      }

      Alert.alert('Berhasil', `File ${name} berhasil dipilih!`);
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat memilih file.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title={buttonTitle} onPress={handlePickFile} />
    </View>
  );
};

// Fungsi bantu untuk menghasilkan MIME type filter dari ekstensi
const getMimeTypeFilter = (extensions: string[]): string => {
  const mimeTypes: string[] = [];
  extensions.forEach((ext) => {
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        if (!mimeTypes.includes('image/jpeg')) mimeTypes.push('image/jpeg');
        break;
      case 'png':
        if (!mimeTypes.includes('image/png')) mimeTypes.push('image/png');
        break;
      case 'pdf':
        if (!mimeTypes.includes('application/pdf')) mimeTypes.push('application/pdf');
        break;
      default:
        mimeTypes.push('*/*'); // fallback
    }
  });
  return mimeTypes.length > 0 ? mimeTypes.join(',') : '*/*';
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default CustomUploadButton;