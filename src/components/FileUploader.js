import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import { COLORS, SIZES, SHADOWS } from '../theme';

/**
 * Reusable file upload component for Excel files
 * @param {Object} props - Component props
 * @param {Function} props.onFilePicked - Callback when file is picked with file object
 * @param {Boolean} props.uploading - Whether file is currently uploading
 * @param {Number} props.progress - Upload progress (0-1)
 * @param {String} props.prompt - Text to display in the upload box
 * @returns {JSX.Element} FileUploader component
 */
const FileUploader = ({ 
  onFilePicked, 
  uploading = false, 
  progress = 0,
  prompt = 'Tap to select Excel file (.xlsx)'
}) => {
  const [file, setFile] = useState(null);
  
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });
      
      const pickedFile = {
        name: result[0].name,
        size: result[0].size,
        type: result[0].type,
        uri: result[0].uri,
      };
      
      setFile(pickedFile);
      
      if (onFilePicked) {
        onFilePicked(pickedFile);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Error picking document:', err);
      }
    }
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <View style={styles.container}>
      {!file ? (
        <TouchableOpacity 
          style={styles.uploadBox} 
          onPress={handleFilePick}
          disabled={uploading}
        >
          <MaterialCommunityIcons 
            name="file-upload" 
            size={48} 
            color={COLORS.primary} 
          />
          <Text style={styles.uploadText}>{prompt}</Text>
          <Text style={styles.fileTypeText}>(.xlsx files only)</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.fileContainer}>
          <View style={styles.fileInfoContainer}>
            <MaterialCommunityIcons 
              name="file-excel" 
              size={36} 
              color={COLORS.primary} 
            />
            <View style={styles.fileDetails}>
              <Text style={styles.fileName}>{file.name}</Text>
              <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
            </View>
            {!uploading && (
              <TouchableOpacity onPress={handleFilePick}>
                <MaterialCommunityIcons name="refresh" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>
          
          {uploading && (
            <View style={styles.progressContainer}>
              <ProgressBar 
                progress={progress} 
                color={COLORS.primary}
                style={styles.progressBar}
              />
              <Text style={styles.progressText}>
                {Math.round(progress * 100)}% Uploading...
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: COLORS.tertiary,
    borderStyle: 'dashed',
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  uploadText: {
    marginTop: SIZES.margin,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  fileTypeText: {
    marginTop: SIZES.margin / 2,
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  fileContainer: {
    width: '100%',
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin / 2,
    ...SHADOWS.small,
  },
  fileDetails: {
    flex: 1,
    marginLeft: SIZES.margin,
  },
  fileName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  fileSize: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  progressContainer: {
    marginTop: SIZES.margin / 2,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginTop: SIZES.margin / 4,
    textAlign: 'center',
  },
});

export default FileUploader;
