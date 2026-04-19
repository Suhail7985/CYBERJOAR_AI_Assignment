import React, { useState, useRef } from 'react';
import { X, Upload, MapPin, Info, Send, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';
import Button from '../UI/Button';
import { intelligenceApi } from '../../services/api';
import Papa from 'papaparse';

const UploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    sourceType: 'HUMINT',
    classification: 'UNCLASSIFIED',
    description: '',
    lat: '',
    lng: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [bulkData, setBulkData] = useState(null);
  const fileInputRef = useRef(null);

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        sourceType: 'HUMINT',
        classification: 'UNCLASSIFIED',
        description: '',
        lat: '',
        lng: '',
        imageUrl: ''
      });
      setPreviewImage(null);
      setBulkData(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    // Image Handling
    if (fileType.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
      
      // Upload immediately to get URL
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await intelligenceApi.uploadImage(formData);
        setFormData(prev => ({ ...prev, imageUrl: res.data.url, sourceType: 'IMINT' }));
      } catch (err) {
        console.error('Image upload failed', err);
      }
    } 
    // CSV Handling
    else if (fileName.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const validData = results.data.filter(row => row.title && row.lat && row.lng).map(row => ({
            ...row,
            location: { type: 'Point', coordinates: [row.lng, row.lat] }
          }));
          setBulkData(validData);
        }
      });
    }
    // JSON Handling
    else if (fileName.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          const items = Array.isArray(json) ? json : [json];
          const validData = items.filter(row => row.title && row.lat && row.lng).map(row => ({
            ...row,
            location: { type: 'Point', coordinates: [row.lng, row.lat] }
          }));
          setBulkData(validData);
        } catch (err) {
          console.error('JSON parse error', err);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (bulkData) {
        await intelligenceApi.bulkCreate(bulkData);
      } else {
        const payload = {
          ...formData,
          location: {
            type: 'Point',
            coordinates: [parseFloat(formData.lng), parseFloat(formData.lat)]
          }
        };
        delete payload.lat;
        delete payload.lng;
        await intelligenceApi.create(payload);
      }
      onUploadSuccess();
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload intelligence. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111] border border-[#333] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-[#222] flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Upload size={18} className="text-emerald-500" />
             </div>
             <h2 className="text-lg font-bold">Ingest Intelligence</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {/* File Dropzone */}
          <div 
            className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all ${
              dragActive ? 'border-emerald-500 bg-emerald-500/5' : 'border-[#333] hover:border-[#444] bg-[#0c0c0c]'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept=".csv,.json,image/*" 
              onChange={handleFileChange}
            />
            
            {previewImage ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#333]">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => {setPreviewImage(null); setFormData(p => ({...p, imageUrl: ''}))}}
                  className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-black/80"
                >
                  <X size={14} />
                </button>
              </div>
            ) : bulkData ? (
               <div className="flex flex-col items-center gap-2">
                  <FileText size={40} className="text-emerald-500" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-white">{bulkData.length} entries detected</p>
                    <p className="text-xs text-gray-500">Bulk ingestion mode active</p>
                  </div>
                  <button 
                    onClick={() => setBulkData(null)}
                    className="text-xs text-red-500 hover:underline mt-2"
                  >
                    Clear selection
                  </button>
               </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                  <Upload size={24} className="text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-300">Drag and drop or <button onClick={() => fileInputRef.current?.click()} className="text-emerald-500 hover:underline">browse</button></p>
                <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">Supports CSV, JSON, JPG, PNG</p>
              </>
            )}
          </div>

          {!bulkData && (
            <form id="intel-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Report Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Seismic activity detected in sector 7"
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-emerald-500/50"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Source</label>
                    <select 
                       className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-emerald-500/50 text-gray-300"
                       value={formData.sourceType}
                       onChange={(e) => setFormData({...formData, sourceType: e.target.value})}
                    >
                        <option value="HUMINT">HUMINT (Field Report)</option>
                        <option value="OSINT">OSINT (Public Data)</option>
                        <option value="IMINT">IMINT (Imagery)</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Classification</label>
                    <select 
                       className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-emerald-500/50 text-gray-300"
                       value={formData.classification}
                       onChange={(e) => setFormData({...formData, classification: e.target.value})}
                    >
                        <option value="UNCLASSIFIED">Unclassified</option>
                        <option value="CONFIDENTIAL">Confidential</option>
                        <option value="SECRET">Secret</option>
                        <option value="TOP SECRET">Top Secret</option>
                    </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description / Observations</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Detailed findings and corroborating evidence..."
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#151515] p-4 rounded-xl border border-[#222]">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                       <MapPin size={10} /> Latitude
                    </label>
                    <input 
                      required
                      type="number" step="any" placeholder="20.59"
                      className="w-full bg-[#111] border border-[#333] rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-emerald-500/50"
                      value={formData.lat}
                      onChange={(e) => setFormData({...formData, lat: e.target.value})}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                       <MapPin size={10} /> Longitude
                    </label>
                    <input 
                      required
                      type="number" step="any" placeholder="78.96"
                      className="w-full bg-[#111] border border-[#333] rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-emerald-500/50"
                      value={formData.lng}
                      onChange={(e) => setFormData({...formData, lng: e.target.value})}
                    />
                </div>
              </div>
            </form>
          )}

          {bulkData && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
              <Info className="text-emerald-500 flex-shrink-0" size={18} />
              <p className="text-xs text-gray-400">
                You are about to ingest <span className="text-white font-bold">{bulkData.length}</span> tactical data points directly into the fusion engine. This action anchors markers to their geospatial locations instantly.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#222] bg-[#0c0c0c] flex gap-3">
           <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
           </Button>
           <Button 
             form="intel-form" 
             onClick={bulkData ? handleSubmit : undefined} 
             type={bulkData ? "button" : "submit"} 
             disabled={isSubmitting} 
             className="flex-1"
           >
              {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
              ) : (
                  <>{bulkData ? 'Confirm Bulk Ingest' : 'Submit Intelligence'} <Send size={16} /></>
              )}
           </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
