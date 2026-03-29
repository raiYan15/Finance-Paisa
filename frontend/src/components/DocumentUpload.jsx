import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiFile, FiX, FiCheck } from 'react-icons/fi';
import { uploadAPI } from '../services/api';
import toast from 'react-hot-toast';

const docTypes = [
  { value: 'panCard', label: 'PAN Card' },
  { value: 'aadharCard', label: 'Aadhaar Card' },
  { value: 'salarySlip', label: 'Salary Slip' },
  { value: 'bankStatement', label: 'Bank Statement' },
  { value: 'itReturn', label: 'ITR / Tax Return' },
  { value: 'photo', label: 'Passport Photo' },
  { value: 'other', label: 'Other Document' },
];

export default function DocumentUpload({ applicationId, onUpload }) {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('panCard');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();

  const handleFile = (f) => {
    if (f && f.size > 5 * 1024 * 1024) { toast.error('File size must be under 5MB'); return; }
    setFile(f);
    setUploaded(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) { toast.error('Please select a file'); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('documentType', docType);
      if (applicationId) formData.append('applicationId', applicationId);
      const { data } = await uploadAPI.upload(formData);
      if (data.success) {
        setUploaded(true);
        setFile(null);
        toast.success('Document uploaded successfully!');
        onUpload?.(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <select
        value={docType}
        onChange={e => setDocType(e.target.value)}
        className="input-field"
      >
        {docTypes.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-none p-8 text-center cursor-pointer transition-all duration-200 ${
          dragOver ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-white/10 hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-white/5'
        }`}
      >
        <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FiFile className="text-primary-500 text-2xl" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="ml-4 text-red-400 hover:text-red-500">
              <FiX />
            </button>
          </div>
        ) : (
          <>
            <FiUpload className="text-3xl text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Drop file here or click to browse</p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG • Max 5MB</p>
          </>
        )}
      </div>

      <motion.button
        onClick={handleUpload}
        disabled={!file || uploading}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-none font-600 text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
          uploaded ? 'bg-emerald-500 text-white' : 'btn-primary'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Uploading...
          </>
        ) : uploaded ? (
          <><FiCheck /> Uploaded Successfully</>
        ) : (
          <><FiUpload /> Upload Document</>
        )}
      </motion.button>
    </div>
  );
}
